import StripeProvider from '../../lib/StripeProvider'
import PaymentForm from './PaymentForm'

export default function PaymentStep({
    clientSecret,
    totalAmount,
    onBack,
}: {
    clientSecret: string
    totalAmount: number
    onBack: () => void
}) {
    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentForm onBack={onBack} totalAmount={totalAmount} />
        </StripeProvider>
    )
}
