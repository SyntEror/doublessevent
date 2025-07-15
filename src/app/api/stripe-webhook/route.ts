import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil',
})

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

export async function POST(req: NextRequest) {
    // ---------- Verify signature ----------
    const sig = req.headers.get('stripe-signature')!
    const buf = await req.arrayBuffer()
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            Buffer.from(buf),
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (err) {
        console.error('❌  Webhook signature failed', err)
        return NextResponse.json(
            { error: 'Webhook signature failed' },
            { status: 400 },
        )
    }

    // ---------- Handle successful payments ----------
    if (event.type === 'payment_intent.succeeded') {
        const pi = event.data.object as Stripe.PaymentIntent

        /* 1. Send the confirmation e-mail (same as before) */
        const mailBody = `
New payment received
--------------------
Email   : ${pi.receipt_email}
Plan    : ${pi.metadata.plan}
Add-on  : ${pi.metadata.includeScreen}
Paid in full: ${pi.metadata.pay_in_full}
Amount  : €${(pi.amount_received / 100).toFixed(2)}
`
        await transporter.sendMail({
            to: [pi.receipt_email!, process.env.INTERNAL_EMAIL!],
            from: process.env.INTERNAL_EMAIL!,
            subject: 'Subscription payment received',
            text: mailBody,
        })

        /* 2. Create the next instalment if any */
        // schedule_json contains the remaining percentages, e.g. "[0.5]" or "[0.33,0.33]"
        const queue: number[] = JSON.parse(pi.metadata.schedule_json || '[]')
        if (queue.length === 0) {
            // nothing left to charge – we're done
            return NextResponse.json({ received: true })
        }

        // Pop the next percentage and re-store the shortened queue
        const nextPct = queue.shift()! // e.g. 0.5
        const nextAmount = Math.round(
            Number(pi.metadata.total_due_cents) * nextPct,
        )

        try {
            await stripe.paymentIntents.create({
                amount: nextAmount,
                currency: 'eur',
                customer: pi.customer as string,
                payment_method: pi.payment_method as string,
                off_session: true,
                confirm: true,
                automatic_payment_methods: { enabled: true },
                metadata: {
                    ...pi.metadata,
                    schedule_json: JSON.stringify(queue),
                },
            })
        } catch (err) {
            // You could retry later or send yourself an alert
            console.error('❌  Follow-up charge failed', err)
        }
    }

    return NextResponse.json({ received: true })
}
