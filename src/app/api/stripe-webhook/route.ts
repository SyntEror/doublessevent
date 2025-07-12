import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-06-30.basil'
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature')!;
    const buf = await req.arrayBuffer();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            Buffer.from(buf),
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent;
        const line = `
      New payment:
        Email: ${intent.receipt_email}
        Plan: ${intent.metadata.plan}
        Screen add-on: ${intent.metadata.includeScreen}
        Paid in full: ${intent.metadata.pay_in_full}
        Amount: $${(intent.amount_received / 100).toFixed(2)}
    `;

        await transporter.sendMail({
            to: [intent.receipt_email!, process.env.INTERNAL_EMAIL!],
            from: process.env.INTERNAL_EMAIL!,
            subject: 'Subscription payment received',
            text: line,
        });
    }
    return NextResponse.json({ received: true });
}
