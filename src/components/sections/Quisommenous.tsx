'use client'
import { motion, Variants } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Quisommenous = () => {
    const { t } = useTranslation('quisommenous')
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    }

    return (
        <section
            className="scroll-mt-16 py-12 sm:py-16 lg:py-20"
            id="quisommenous"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="mb-10 text-center text-3xl font-bold text-secondary sm:text-4xl md:text-5xl lg:text-6xl">
                    {t('title')}
                </h1>
                <motion.div
                    className="flex flex-col gap-12 md:flex-row md:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full md:w-1/2 lg:w-2/5"
                    >
                        <Image
                            src="/logo.png"
                            alt="DoubleSS Event Logo"
                            width={3320}
                            height={1000}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full object-cover"
                            priority
                        />
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        className="flex w-full items-center justify-center text-center text-xl font-medium leading-relaxed text-white sm:text-2xl md:w-1/2 md:text-left lg:w-3/5 lg:text-3xl"
                    >
                        {t('description')}
                    </motion.div>
                </motion.div>
                <motion.div
                    className="mt-12 sm:mt-16 lg:mt-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    id="localisation"
                >
                    <h3 className="mb-8 flex items-center justify-center gap-2 text-center text-3xl font-bold text-secondary sm:text-4xl md:text-5xl">
                        <MapPin className="h-8 w-8" /> {t('locationTitle')}
                    </h3>
                    <motion.div
                        variants={itemVariants}
                        className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-lg sm:h-[400px] md:h-[450px]"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11886.69429022256!2d12.462724511987394!3d41.856852405324354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13258a8900f8d777%3A0x41aa5030fbe34f3c!2sV.le%20Leonardo%20da%20Vinci%2C%203%2C%2000145%20Roma%20RM%2C%20Italy!5e0!3m2!1sen!2stn!4v1752166496357!5m2!1sen!2stn"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="DoubleSS Event Location"
                        ></iframe>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Quisommenous
