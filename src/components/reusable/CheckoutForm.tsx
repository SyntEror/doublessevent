'use client'
import PaymentStep from '@/components/reusable/PaymentStep'
import React, { useState } from 'react'

type Props = { plan: 'standard' | 'vip'; close: () => void }

export default function CheckoutForm({ plan, close }: Props) {
    // ─── component state ──────────────────────────────────────────────────────────
    const [step, setStep] = useState<0 | 1>(0)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // user inputs
    const [includeScreen, setIncludeScreen] = useState(false)
    const [installments, setInstallments] = useState<'full' | '2x' | '3x'>(
        'full',
    )
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    // ─── first screen: collect details ────────────────────────────────────────────
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
                    installments,
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
            console.error(err)
            setError('Erreur serveur – veuillez réessayer.')
        }
        setLoading(false)
    }

    // ─── step 1: Stripe PaymentElement ────────────────────────────────────────────
    if (step === 1 && clientSecret) {
        return (
            <PaymentStep
                clientSecret={clientSecret}
                onBack={() => setStep(0)}
            />
        )
    }

    // ─── step 0: collect user data ────────────────────────────────────────────────
    return (
        <form
            onSubmit={handleNext}
            className="mx-auto max-w-lg space-y-4 rounded-b-2xl bg-white p-6 shadow"
        >
            <h2 className="mb-2 text-xl font-semibold text-blue-600">
                Formule {plan.toUpperCase()}
            </h2>

            {/* Name */}
            <label className="block text-black">
                <span>Nom&nbsp;et&nbsp;prénom</span>
                <input
                    className="mt-1 w-full rounded border p-2"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </label>

            {/* E-mail */}
            <label className="block text-black">
                <span>E-mail</span>
                <input
                    type="email"
                    className="mt-1 w-full rounded border p-2"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>

            {/* Phone */}
            <label className="block text-black">
                <span>Téléphone</span>
                <input
                    className="mt-1 w-full rounded border p-2"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
            </label>

            {/* Add-on checkbox */}
            <div className="flex items-center space-x-2 text-black">
                <input
                    type="checkbox"
                    id="screen"
                    checked={includeScreen}
                    onChange={() => setIncludeScreen(!includeScreen)}
                />
                <label htmlFor="screen">Ajouter l’écran (+ 500 €)</label>
            </div>

            {/* Instalment options */}
            <fieldset className="space-y-1 text-black">
                <legend className="font-medium">Échéancier de paiement</legend>

                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={installments === 'full'}
                        onChange={() => setInstallments('full')}
                        className="mr-2"
                    />
                    Payer 100 % maintenant
                </label>

                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={installments === '2x'}
                        onChange={() => setInstallments('2x')}
                        className="mr-2"
                    />
                    50 % maintenant / 50 % dans 1&nbsp;mois
                </label>

                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={installments === '3x'}
                        onChange={() => setInstallments('3x')}
                        className="mr-2"
                    />
                    34 % maintenant / 33 % les 2&nbsp;mois suivants
                </label>
            </fieldset>

            {/* Buttons */}
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
                    className="flex-1 rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Chargement…' : 'Continuer vers le paiement'}
                </button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    )
}
