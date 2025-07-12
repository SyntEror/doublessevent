import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import config from '@/data/paymentConfig.json';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
});

const Body = z.object({
    plan: z.enum(['standard', 'vip']),
    includeScreen: z.boolean(),
    payer: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
    }),
    payInFull: z.boolean(),
    customAmount: z.number().positive().optional(), // used when payInFull === false
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = Body.parse(body);

    // Lookup price IDs from config

    const planInfo = (config as any).plans.find((p: any) => p.id === data.plan);
    const addonInfo = (config as any).addon;

    let total = planInfo.amount;
    if (data.includeScreen) total += addonInfo.amount;

    const amount = data.payInFull ? total : Math.round(data.customAmount! * 100);

    // Deadline enforcement (client can choose any split, but must pay before deadline)
    const deadline = new Date((config as any).deadline + 'T23:59:59Z'); // UTC
    const now = new Date();
    if (now > deadline) {
        return NextResponse.json(
            { error: 'Payment deadline has passed' },
            { status: 400 }
        );
    }

    // Create or reuse customer by email
    const [customer] = await stripe.customers.list({
        email: data.payer.email,
        limit: 1,
    });
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
                    deadline: (config as any).deadline,
                    total_due_cents: total,
                },
            })
        ).id;

    const intent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        customer: customerId,
        capture_method: 'automatic',
        payment_method_types: ['card', 'paypal', 'klarna'], // enable everything in Dashboard first
        metadata: {
            plan: data.plan,
            includeScreen: data.includeScreen ? 'yes' : 'no',
            total_due_cents: total,
            pay_in_full: data.payInFull ? 'yes' : 'no',
        },
        receipt_email: data.payer.email,
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
}
