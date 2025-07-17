import StripeProvider from '../lib/StripeProvider'
import PaymentForm from './PaymentForm'

export default function PaymentStep({
    clientSecret,
    totalAmount,
    onBack,
    plan,
}: {
    clientSecret: string
    totalAmount: number
    onBack: () => void
    plan: 'standard' | 'vip'
}) {
    console.log('totalAmount', totalAmount)
    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentForm
                onBack={onBack}
                totalAmount={totalAmount}
                plan={plan}
            />
        </StripeProvider>
    )
}
