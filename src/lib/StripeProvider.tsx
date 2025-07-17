'use client'
import { env } from '@/env'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Props = {
    clientSecret: string
    children: React.ReactNode
}

export default function StripeProvider({ clientSecret, children }: Props) {
    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            {children}
        </Elements>
    )
}
