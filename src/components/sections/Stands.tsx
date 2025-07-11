// components/StandOffers.tsx
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image' // Or standard <img> tag if not using Next.js

const StandOffers = () => {
    const container = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.2,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <section id="stands" className="px-6 py-12">
            <motion.div
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
            >
                <h1 className="mb-10 text-center text-3xl font-bold text-secondary sm:text-4xl md:text-5xl lg:text-6xl">
                    Nos Offres de Stand
                </h1>

                <div className="flex flex-col justify-around gap-y-10 md:flex-row">
                    <motion.div
                        className="flex w-full flex-col rounded-lg bg-white p-6 shadow-lg md:w-[500px]"
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
                            <li>Tarif tout inclus : 2.000 €</li>
                            <li>Mobilier complet avec vitrine</li>
                            <li>Enseigne personnalisée incluse</li>
                            <li>Éclairage & électricité fournis</li>
                            <li>Option écran : +500 €</li>
                        </ul>
                        <button className="mt-auto rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            Réserver ce stand
                        </button>
                    </motion.div>
                    <motion.div
                        className="flex w-full flex-col rounded-lg bg-secondary p-6 shadow-lg md:w-[500px]"
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
                            <li>Tarif tout inclus : 3.000 €</li>
                            <li>Design moderne & raffiné</li>
                            <li>Mobilier, logo & enseignes personnalisés</li>
                            <li>Électricité & hébergement inclus</li>
                            <li>Transport hôtel-salon offert</li>
                            <li>Option écran : +500 €</li>
                        </ul>
                        <button className="mt-auto rounded bg-primary px-4 py-2 text-white transition hover:bg-primary/80">
                            Réserver ce stand
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default StandOffers
