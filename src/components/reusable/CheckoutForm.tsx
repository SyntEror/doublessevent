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
    const [payInFull, setPayInFull] = useState(true)
    const [customAmount, setCustomAmount] = useState(0)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

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
                    payInFull,
                    ...(payInFull ? {} : { customAmount }),
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

            <div className="space-y-1 text-black">
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={payInFull}
                        onChange={() => setPayInFull(true)}
                        className="mr-2"
                    />
                    Payer en une fois
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={!payInFull}
                        onChange={() => setPayInFull(false)}
                        className="mr-2"
                    />
                    Payer en plusieurs fois
                </label>
                {!payInFull && (
                    <input
                        type="number"
                        className="w-full rounded border p-2"
                        placeholder="Amount to pay this time (EUR)"
                        value={customAmount}
                        onChange={e => setCustomAmount(Number(e.target.value))}
                        min={1}
                        step={0.01}
                        required
                    />
                )}
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
