'use client';
import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import StripeProvider from './StripeProvider';

// ---------- inner payment step ----------
function PaymentStep({
                         clientSecret,
                         onBack,
                     }: {
    clientSecret: string;
    onBack: () => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: { return_url: window.location.href },
        });
        if (error) setMessage(error.message ?? 'Payment failed');
    };

    return (
        <StripeProvider clientSecret={clientSecret}>
            <form
                onSubmit={handlePay}
                className="space-y-4 max-w-lg p-6 mx-auto bg-white shadow rounded"
            >
                <PaymentElement />

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 border rounded py-2"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe}
                        className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                    >
                        Pay
                    </button>
                </div>

                {message && <p className="text-red-600 pt-2">{message}</p>}
            </form>
        </StripeProvider>
    );
}

// ---------- whole two-step form ----------
type Props = { plan: 'standard' | 'vip'; close: () => void };

export default function CheckoutForm({ plan, close }: Props) {
    // step 0 = collecting info, step 1 = payment element
    const [step, setStep] = useState<0 | 1>(0);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // user inputs
    const [includeScreen, setIncludeScreen] = useState(false);
    const [payInFull, setPayInFull] = useState(true);
    const [customAmount, setCustomAmount] = useState(0);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // first screen: collect details
    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    plan,
                    includeScreen,
                    payInFull,
                    customAmount,
                    payer: { name, email, phone },
                }),
            });
            const { clientSecret, error } = await res.json();
            if (error) {
                setError(error);
            } else {
                setClientSecret(clientSecret);
                setStep(1);
            }
        } catch (err) {
            console.log(err)
            setError('Server error, please try again.');
        }
        setLoading(false);
    };

    if (step === 1 && clientSecret) {
        return (
            <PaymentStep
                clientSecret={clientSecret}
                onBack={() => setStep(0)}
            />
        );
    }

    // step 0 UI
    return (
        <form
            onSubmit={handleNext}
            className="space-y-4 max-w-lg p-6 mx-auto bg-white shadow rounded"
        >
            <h2 className="text-xl font-semibold mb-2">
                {plan.toUpperCase()} plan
            </h2>

            <label className="block">
                <span>Name</span>
                <input
                    className="mt-1 p-2 w-full border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>

            <label className="block">
                <span>Email</span>
                <input
                    type="email"
                    className="mt-1 p-2 w-full border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>

            <label className="block">
                <span>Phone (optional)</span>
                <input
                    className="mt-1 p-2 w-full border rounded"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="screen"
                    checked={includeScreen}
                    onChange={() => setIncludeScreen(!includeScreen)}
                />
                <label htmlFor="screen">Add “écran” (+ $500)</label>
            </div>

            <div className="space-y-1">
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={payInFull}
                        onChange={() => setPayInFull(true)}
                        className="mr-2"
                    />
                    Pay full amount now
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        checked={!payInFull}
                        onChange={() => setPayInFull(false)}
                        className="mr-2"
                    />
                    Split payments
                </label>
                {!payInFull && (
                    <input
                        type="number"
                        className="p-2 border rounded w-full"
                        placeholder="Amount to pay this time (USD)"
                        value={customAmount}
                        onChange={(e) =>
                            setCustomAmount(Number(e.target.value))
                        }
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
                    className="flex-1 border rounded py-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    {loading ? 'Preparing…' : 'Continue to payment'}
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
}
