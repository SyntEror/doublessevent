'use client'
import PaymentStep from '@/components/reusable/PaymentStep'
import React, { useState } from 'react'

// ---------- whole two-step form ----------
type Props = { plan: 'standard' | 'vip'; close: () => void }

export default function CheckoutForm({ plan, close }: Props) {
    // step 0 = collecting info, step 1 = payment element
    const [step, setStep] = useState<0 | 1>(0)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // user inputs
    const [includeScreen, setIncludeScreen] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    // Pricing for each plan
    const standardPrice = 2000 // Example: price for standard plan in EUR
    const vipPrice = 3000 // Example: price for vip plan in EUR
    const screenPrice = 500 // Price for screen option in EUR

    // Calculate total price
    const calculateTotalAmount = () => {
        let totalAmount = plan === 'standard' ? standardPrice : vipPrice
        if (includeScreen) totalAmount += screenPrice
        return totalAmount
    }

    // first screen: collect details
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    plan,
                    includeScreen,
                    payer: { name, email, phone },
                }),
            })
            const { clientSecret, error } = await res.json()
            if (error) {
                setError(error)
            } else {
                setClientSecret(clientSecret)
                setStep(1)
            }
        } catch (err) {
            console.log(err)
            setError('Server error, please try again.')
        }
        setLoading(false)
    }

    if (step === 1 && clientSecret) {
        return (
            <PaymentStep
                clientSecret={clientSecret}
                onBack={() => setStep(0)}
                totalAmount={calculateTotalAmount()}
            />
        )
    }

    // step 0 UI
    return (
        <form
            onSubmit={handleNext}
            className="mx-auto max-w-lg space-y-4 rounded-b-2xl bg-white p-6 shadow"
        >
            <h2 className="mb-2 text-xl font-semibold text-blue-600">
                Plan {plan.toUpperCase()}
            </h2>

            <label className="block text-black">
                <span>Nom et Prénom</span>
                <input
                    className="mt-1 w-full rounded border p-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </label>

            <label className="block text-black">
                <span>Email</span>
                <input
                    type="email"
                    className="mt-1 w-full rounded border p-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>

            <label className="block text-black">
                <span>Téléphone</span>
                <input
                    className="mt-1 w-full rounded border p-2"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
            </label>

            <div className="flex items-center space-x-2 text-black">
                <input
                    type="checkbox"
                    id="screen"
                    checked={includeScreen}
                    onChange={() => setIncludeScreen(!includeScreen)}
                />
                <label htmlFor="screen">Ajouter “écran” (+ €500)</label>
            </div>

            {/* Display total amount */}
            <div className="font-semibold text-black">
                <p>Total à payer: €{calculateTotalAmount()}</p>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={close}
                    className="flex-1 rounded border py-2"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
                >
                    {loading ? 'Chargement...' : 'Continuer vers le paiement'}
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}
        </form>
    )
}
