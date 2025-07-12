'use client'
import services from '@/data/services.json'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

const cardVariants: Variants = {
    offscreen: { opacity: 0, y: 60 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, type: 'spring', bounce: 0.28 },
    },
}

const Services = () => (
    <section className="py-16 scroll-mt-24" id="services" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h2
                id="services-heading"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="mb-12 text-center text-3xl font-extrabold text-secondary drop-shadow md:text-6xl"
            >
                <motion.span
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'backOut' }}
                    className="inline-block"
                >
                    🎉 Nos Services
                </motion.span>
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map(service => (
                    <motion.article
                        key={service.title}
                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-secondary shadow-lg transition-all duration-300 hover:shadow-2xl"
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.23 }}
                        variants={cardVariants}
                        tabIndex={0}
                        aria-label={service.title}
                    >
                        <div className="relative">
                            <Image
                                src={service.image}
                                alt={service.title}
                                className="duration-400 h-60 w-full object-center transition-transform group-hover:scale-105"
                                width={500}
                                height={300}
                                loading="lazy"
                                draggable={false}
                                sizes="(max-width: 768px) 100vw, 500px"
                            />
                            {/* Overlay for hover effect */}
                            <motion.div
                                className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"
                                aria-hidden
                            />
                        </div>
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">
                                {service.title}
                            </h3>
                            <p className="mb-4 text-gray-700">
                                {service.description}
                            </p>
                            {service.price && (
                                <motion.p
                                    initial={{ scale: 0.9, opacity: 0.7 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-lg font-semibold text-indigo-600"
                                >
                                    {service.price}
                                </motion.p>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </div>
    </section>
)

export default Services
