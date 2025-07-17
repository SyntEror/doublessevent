'use client'
import CheckoutForm from '@/components/CheckoutForm'
import Modal from '@/components/reusable/Modal'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const StandOffers = () => {
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<'standard' | 'vip'>('standard')
    const [paymentStatus, setPaymentStatus] = useState<
        'success' | 'failure' | null
    >(null)

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
                    Nos Offres de Stand
                </h1>

                <div className="flex flex-col justify-around gap-y-10 md:flex-row">
                    {/* Standard card */}
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
                            STAND STANDARD – 3×3 m
                        </h3>
                        <p className="mb-4 text-gray-700">
                            Visibilité professionnelle à prix maîtrisé
                        </p>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600">
                            <li>Surface : 9 m² (3×3 m)</li>
                            <li>
                                Tarif tout inclus : <b>2 099 €</b>
                            </li>
                            <li>Mobilier complet avec vitrine</li>
                            <li>Enseigne personnalisée incluse</li>
                            <li>Éclairage & électricité fournis</li>
                            <li>
                                Option écran : <b>+500 €</b>
                            </li>
                        </ul>
                        <button
                            className="mt-auto rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                            onClick={() => {
                                setType('standard')
                                setShowModal(true)
                            }}
                        >
                            Réserver ce stand
                        </button>
                    </motion.div>

                    {/* VIP card */}
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
                            STAND VIP – 4×4 m
                        </h3>
                        <p className="mb-4 text-gray-700">
                            Une présence prestigieuse au salon
                        </p>
                        <ul className="mb-4 list-inside list-disc space-y-1 text-sm text-gray-600">
                            <li>Espace premium 4×4 m</li>
                            <li>
                                Tarif tout inclus : <b>3 099 €</b>
                            </li>
                            <li>Design moderne & raffiné</li>
                            <li>Mobilier, logo & enseignes personnalisés</li>
                            <li>Électricité & hébergement inclus</li>
                            <li>Transport hôtel-salon offert</li>
                            <li>
                                Option écran : <b>+500 €</b>
                            </li>
                        </ul>
                        <button
                            onClick={() => {
                                setType('vip')
                                setShowModal(true)
                            }}
                            className="mt-auto rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/80"
                        >
                            Réserver ce stand
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {showModal && (
                <Modal>
                    {paymentStatus === 'success' ? (
                        <div className="rounded-b-2xl p-2">
                            <h2 className="text-2xl font-semibold text-green-600">
                                Paiement réussi !
                            </h2>
                            <p className="mt-4 text-lg text-black">
                                Merci pour votre commande. Veuillez vérifier
                                votre e-mail pour plus d&#39;informations.
                            </p>
                            <button
                                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    ) : paymentStatus === 'failure' ? (
                        <div className="rounded-b-2xl p-2">
                            <h2 className="text-2xl font-semibold text-red-600">
                                Échec du paiement
                            </h2>
                            <p className="mt-4 text-lg text-black">
                                Il y a eu un problème avec votre paiement.
                                Veuillez réessayer ou contacter le support.
                            </p>
                            <button
                                className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
                                onClick={() => setShowModal(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    ) : (
                        <CheckoutForm
                            plan={type}
                            close={() => setShowModal(false)}
                        />
                    )}
                </Modal>
            )}
        </section>
    )
}

export default StandOffers
