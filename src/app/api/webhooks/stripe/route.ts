import { env } from '@/env'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'

const stripe = new Stripe(env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
})

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')!
    const buf = await req.arrayBuffer()
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            Buffer.from(buf),
            sig,
            env.STRIPE_WEBHOOK_SECRET,
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Webhook signature failed' },
            { status: 400 },
        )
    }

    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent
        const line = `
      New payment:
        Email: ${intent.receipt_email}
        Plan: ${intent.metadata.plan}
        Screen add-on: ${intent.metadata.includeScreen}
        Paid in full: ${intent.metadata.pay_in_full}
        Amount: $${(intent.amount_received / 100).toFixed(2)}
    `

        try {
            await transporter.sendMail({
                to: [intent.receipt_email!, env.INTERNAL_EMAIL],
                from: env.INTERNAL_EMAIL!,
                subject: 'Payment received',
                text: line,
            })
            console.log('[WEBHOOK] Email sent (or attempted)')
        } catch (e) {
            console.error('Error sending email:', e)
        }
    }
    return NextResponse.json({ received: true })
}
