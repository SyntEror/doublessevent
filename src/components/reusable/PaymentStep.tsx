import StripeProvider from '../../lib/StripeProvider'
import PaymentForm from './PaymentForm'

export default function PaymentStep({
    clientSecret,
    onBack,
}: {
    clientSecret: string
    onBack: () => void
}) {
    return (
        <StripeProvider clientSecret={clientSecret}>
            <PaymentForm onBack={onBack} />
        </StripeProvider>
    )
}
