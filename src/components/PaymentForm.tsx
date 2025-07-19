'use client'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function PaymentForm({
    onBack,
    totalAmount,
    plan,
}: {
    onBack: () => void
    totalAmount: number
    plan: 'standard' | 'vip'
}) {
    const stripe = useStripe()
    const elements = useElements()
    const { t } = useTranslation('checkout')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)
        setMessage('')

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.href },
        })

        if (error) {
            setMessage(error.message ?? t('paymentFailed'))
        }

        setLoading(false)
    }

    return (
        <form
            onSubmit={handlePay}
            className="mx-auto max-w-lg space-y-4 rounded bg-white p-6 md:p-2"
        >
            <div className="font-semibold text-black">
                <p>{t('total', { amount: totalAmount })}</p>
            </div>

            <PaymentElement />

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onBack}
                    className={`flex-1 rounded border-2 py-2 text-sm text-black md:text-base ${
                        plan === 'standard'
                            ? 'border-blue-600 hover:border-blue-700'
                            : 'border-primary hover:border-primary/80'
                    }`}
                    disabled={loading}
                >
                    {t('back')}
                </button>
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className={`flex-1 rounded py-2 text-sm text-white md:text-base ${
                        plan === 'standard'
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-primary hover:bg-primary/80'
                    }`}
                >
                    {loading ? t('paying') : t('pay')}
                </button>
            </div>

            {message && <p className="pt-2 text-red-600">{message}</p>}
        </form>
    )
}
