import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

export default function PaymentForm({
    onBack,
    totalAmount, // Accept totalAmount as a prop
}: {
    onBack: () => void
    totalAmount: number // Accept totalAmount as a prop
}) {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState('')

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.href },
        })
        if (error) setMessage(error.message ?? 'Payment failed')
    }

    return (
        <form
            onSubmit={handlePay}
            className="mx-auto max-w-lg space-y-4 rounded bg-white p-6 shadow"
        >
            {/* Display the total amount in the payment step */}
            <div className="font-semibold text-black">
                <p>Total à payer: €{totalAmount}</p>
            </div>

            <PaymentElement />

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 rounded border py-2"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="flex-1 rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                    Pay
                </button>
            </div>

            {message && <p className="pt-2 text-red-600">{message}</p>}
        </form>
    )
}
