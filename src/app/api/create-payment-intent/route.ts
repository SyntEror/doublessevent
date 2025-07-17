import configData from '@/data/paymentConfig.json'
import { env } from '@/env'
import { PaymentConfig } from '@/types/payment'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const config = configData as PaymentConfig

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

const Body = z.object({
    plan: z.enum(['standard', 'vip']),
    includeScreen: z.boolean(),
    payer: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
    }),
})

export async function POST(req: NextRequest) {
    const body = await req.json()
    const data = Body.parse(body)

    // Lookup price IDs from config

    const planInfo = config.plans.find(p => p.id === data.plan)
    if (!planInfo) {
        return NextResponse.json({ error: 'Plan not found' }, { status: 400 })
    }
    const addonInfo = config.addon

    let total = planInfo.amount
    if (data.includeScreen) total += addonInfo.amount

    // Deadline enforcement (client can choose any split, but must pay before deadline)
    const deadline = new Date(config.deadline + 'T23:59:59Z') // UTC
    const now = new Date()
    if (now > deadline) {
        return NextResponse.json(
            { error: 'Payment deadline has passed' },
            { status: 400 },
        )
    }

    // Create or reuse customer by emails
    const customers = await stripe.customers.list({
        email: data.payer.email,
        limit: 1,
    })
    const customer = customers.data[0] // First customer or undefined
    const customerId =
        customer?.id ||
        (
            await stripe.customers.create({
                name: data.payer.name,
                email: data.payer.email,
                phone: data.payer.phone,
                metadata: {
                    plan: data.plan,
                    includeScreen: String(data.includeScreen),
                    deadline: config.deadline,
                    total_due_cents: total,
                    name: data.payer.name,
                    phone: data.payer.phone || '',
                },
            })
        ).id

    const intent = await stripe.paymentIntents.create({
        amount: 300,
        currency: 'eur',
        customer: customerId,
        capture_method: 'automatic',
        payment_method_types: ['card', 'paypal'],
        metadata: {
            plan: data.plan,
            includeScreen: data.includeScreen ? 'yes' : 'no',
            total_due_cents: total,
        },
        receipt_email: data.payer.email,
    })

    return NextResponse.json({ clientSecret: intent.client_secret })
}
