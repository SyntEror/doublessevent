'use client'
import CheckoutForm from '@/components/CheckoutForm'
import Modal from '@/components/reusable/Modal'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const StandOffers = () => {
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<'standard' | 'vip'>('standard')
    const [paymentStatus, setPaymentStatus] = useState<
        'success' | 'failure' | null
    >(null)
    const { t } = useTranslation('stands')

    const container = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { delayChildren: 0.2, staggerChildren: 0.2 },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const redirectStatus = urlParams.get('redirect_status')

        if (redirectStatus === 'succeeded') {
            setPaymentStatus('success')
        } else if (redirectStatus === 'failed') {
            setPaymentStatus('failure')
        }
    }, [])

    useEffect(() => {
        if (paymentStatus) {
            setShowModal(true)
        }
    }, [paymentStatus])

    const standard = t('standard', { returnObjects: true }) as {
        title: string
        description: string
        features: string[]
        cta: string
    }

    const vip = t('vip', { returnObjects: true }) as {
        title: string
        description: string
        features: string[]
        cta: string
    }

    const payment = t('payment', { returnObjects: true }) as {
        successTitle: string
        successMessage: string
        failureTitle: string
        failureMessage: string
        close: string
    }

    return (
        <section id="stands" className="scroll-mt-16 px-1 py-12 md:px-6">
            <motion.div
                className="mx-auto max-w-7xl sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
            >
                <h1 className="mb-10 text-center text-3xl font-bold text-secondary sm:text-4xl md:text-5xl lg:text-6xl">
                    {t('title')}
                </h1>

                <div className="flex flex-col justify-around gap-y-10 md:flex-row">
                    {/* Standard Stand */}
                    <motion.div
                        className="flex w-full flex-col rounded-lg bg-white p-3.5 shadow-lg md:w-[500px] md:p-6"
                        variants={item}
                    >
                        <div className="mb-4 flex items-center justify-center">
                            <Image
                                src="/assets/stand-standard.jpg"
                                alt="Stand Standard"
                                width={500}
                                height={300}
                                className="mb-4 rounded-md object-cover"
                            />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-blue-600">
                            {standard.title}
                        </h3>
                        <p className="mb-4 text-gray-700">
                            {standard.description}
                        </p>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600">
                            {Array.isArray(standard.features) &&
                                standard.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                        </ul>
                        <button
                            className="mt-auto rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            onClick={() => {
                                setType('standard')
                                setShowModal(true)
                            }}
                        >
                            {standard.cta}
                        </button>
                    </motion.div>

                    {/* VIP Stand */}
                    <motion.div
                        className="flex w-full flex-col rounded-lg bg-secondary p-3.5 shadow-lg md:w-[500px] md:p-6"
                        variants={item}
                    >
                        <div className="mb-4 flex items-center justify-center">
                            <Image
                                src="/assets/stand-vip.jpg"
                                alt="Stand VIP"
                                width={500}
                                height={300}
                                className="mb-4 items-center rounded-md object-cover"
                            />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-primary">
                            {vip.title}
                        </h3>
                        <p className="mb-4 text-gray-700">{vip.description}</p>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600">
                            {Array.isArray(vip.features) &&
                                vip.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                        </ul>
                        <button
                            onClick={() => {
                                setType('vip')
                                setShowModal(true)
                            }}
                            className="mt-auto rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/80"
                        >
                            {vip.cta}
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {showModal && (
                <Modal>
                    {paymentStatus === 'success' ? (
                        <div className="rounded-b-2xl p-2">
                            <h2 className="text-2xl font-semibold text-green-600">
                                {payment.successTitle}
                            </h2>
                            <p className="mt-4 text-lg text-black">
                                {payment.successMessage}
                            </p>
                            <button
                                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                {payment.close}
                            </button>
                        </div>
                    ) : paymentStatus === 'failure' ? (
                        <div className="rounded-b-2xl p-2">
                            <h2 className="text-2xl font-semibold text-red-600">
                                {payment.failureTitle}
                            </h2>
                            <p className="mt-4 text-lg text-black">
                                {payment.failureMessage}
                            </p>
                            <button
                                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                {payment.close}
                            </button>
                        </div>
                    ) : (
                        <CheckoutForm
                            plan={type}
                            onCloseAction={() => setShowModal(false)}
                        />
                    )}
                </Modal>
            )}
        </section>
    )
}

export default StandOffers
