import configData from '@/data/paymentConfig.json'
import { PaymentConfig } from '@/types/payment'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const config = configData as PaymentConfig
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

// ---------- request schema ----------
const Body = z.object({
    plan: z.enum(['standard', 'vip']),
    includeScreen: z.boolean(),
    payer: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
    }),
    // “full” = 100 %, “2x” = 50 % + 50 %, “3x” = 34 % + 33 % + 33 %
    installments: z.enum(['full', '2x', '3x']),
})

export async function POST(req: NextRequest) {
    const data = Body.parse(await req.json())

    // -------- plan lookup / totals --------
    const planInfo = config.plans.find(p => p.id === data.plan)
    if (!planInfo)
        return NextResponse.json({ error: 'Plan not found' }, { status: 400 })

    const total =
        planInfo.amount + (data.includeScreen ? config.addon.amount : 0)

    // -------- deadline guard --------
    const deadline = new Date(config.deadline + 'T23:59:59Z') // UTC
    if (new Date() > deadline) {
        return NextResponse.json(
            { error: 'Payment deadline has passed' },
            { status: 400 },
        )
    }

    // -------- create / reuse customer --------
    const [customer] = (
        await stripe.customers.list({ email: data.payer.email, limit: 1 })
    ).data
    const customerId =
        customer?.id ??
        (
            await stripe.customers.create({
                name: data.payer.name,
                email: data.payer.email,
                phone: data.payer.phone,
                metadata: { plan: data.plan },
            })
        ).id

    // -------- instalment maths --------
    const splits = {
        full: [1],
        '2x': [0.5, 0.5],
        '3x': [0.34, 0.33, 0.33],
    }[data.installments]

    const firstAmount = Math.round(total * splits[0]) // cents

    // -------- first PaymentIntent --------
    const intent = await stripe.paymentIntents.create({
        amount: firstAmount,
        currency: 'eur',
        customer: customerId,
        automatic_payment_methods: { enabled: true },
        setup_future_usage:
            data.installments === 'full' ? undefined : 'off_session',
        metadata: {
            plan: data.plan,
            includeScreen: data.includeScreen ? 'yes' : 'no',
            total_due_cents: total,
            schedule_json: JSON.stringify(splits.slice(1)), // remaining %
        },
        receipt_email: data.payer.email,
    })

    return NextResponse.json({ clientSecret: intent.client_secret })
}
