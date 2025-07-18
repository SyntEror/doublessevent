'use client'
import PaymentStep from '@/components/PaymentStep'
import React, { useState } from 'react'

// ---------- whole two-step form ----------
type Props = { plan: 'standard' | 'vip'; close: () => void }

export default function CheckoutForm({ plan, close }: Props) {
    // step 0 = collecting info, step 1 = payment element
    const [step, setStep] = useState<0 | 1>(0)
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [countryCode, setCountryCode] = useState('33')

    // user inputs
    const [includeScreen, setIncludeScreen] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    // Pricing for each plan
    const standardPrice = 2099
    const vipPrice = 3099
    const screenPrice = 500

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
                    payer: { name, email, phone: `+${countryCode}${phone}` },
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
                plan={plan}
            />
        )
    }

    // step 0 UI
    return (
        <form
            onSubmit={handleNext}
            className="mx-auto max-w-lg space-y-4 bg-white p-6 md:p-2"
        >
            <h1
                className={`mb-2 text-2xl font-semibold ${plan === 'standard' ? 'text-blue-600' : 'text-primary'}`}
            >
                Plan {plan.toUpperCase()}
            </h1>

            <label className="block text-black">
                <span>Nom et Prénom</span>
                <input
                    className="mt-1 w-full rounded border p-2"
                    placeholder="Ex: Sonia H. R."
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
                    placeholder="Ex: Sony@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>

            <div className="block text-black">
                <span>Téléphone</span>
                <div className="mt-1 flex">
                    <div className="flex items-center rounded-l border border-r-0 bg-gray-100 px-2 text-black">
                        +
                    </div>
                    <input
                        type="tel"
                        pattern="[0-9]*"
                        placeholder="33"
                        className="w-1/6 border-b border-r border-t p-2"
                        value={countryCode}
                        onChange={e =>
                            setCountryCode(e.target.value.replace(/\D/g, ''))
                        }
                        required
                    />
                    <input
                        type="tel"
                        className="w-full rounded-r border p-2"
                        placeholder="Ex : 1234567890"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                </div>
            </div>

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
                <p>
                    Total à payer: <b>€{calculateTotalAmount()}</b>
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={close}
                    className={`flex-1 rounded border-2 text-black hover:bg-gray-100 ${plan === 'standard' ? 'border-blue-600 hover:border-blue-700' : 'border-primary hover:border-primary/80'} `}
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 rounded py-2 text-white ${plan === 'standard' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-primary hover:bg-primary/80'} `}
                >
                    {loading ? 'Chargement...' : 'Continuer vers le paiement'}
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}
        </form>
    )
}
