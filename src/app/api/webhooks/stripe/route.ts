import { env } from '@/env'
import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path'
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
        console.error('[WEBHOOK] Signature verification failed:', err)
        return NextResponse.json(
            { error: 'Webhook signature failed' },
            { status: 400 },
        )
    }

    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent
        const customer = (await stripe.customers.retrieve(
            intent.customer as string,
        )) as Stripe.Customer

        // Load your HTML emails template
        const templatePath = path.join(
            process.cwd(),
            'src/emails/payment-confirmation.html',
        )
        const template = fs.readFileSync(templatePath, 'utf8')

        const filledHtml = template
            .replace('{{name}}', customer.name || '-')
            .replace('{{email}}', intent.receipt_email || '-')
            .replace('{{phone}}', customer.phone || '-')
            .replace('{{plan}}', intent.metadata.plan || '-')
            .replace(
                '{{includeScreen}}',
                intent.metadata.includeScreen === 'yes' ? 'Oui' : 'Non',
            )
            .replace('{{amount}}', (intent.amount_received / 100).toFixed(2))
            .replace('{{date}}', new Date().toLocaleString('fr-FR'))
            .replace(
                '{{stripeLink}}',
                `https://dashboard.stripe.com/payments/${intent.id}`,
            )

        try {
            await transporter.sendMail({
                to: env.INTERNAL_EMAIL,
                from: env.SMTP_FROM_ADDRESS,
                subject: `💰 Nouveau Paiement – ${intent.metadata.plan}`,
                html: filledHtml,
            })
            console.log('[WEBHOOK] Internal notification emails sent ✅')
        } catch (e) {
            console.error('[WEBHOOK] Failed to send emails:', e)
        }
    }

    return NextResponse.json({ received: true })
}
