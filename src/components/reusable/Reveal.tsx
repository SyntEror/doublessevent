'use client'
import { motion, useInView, Variants } from 'framer-motion'
import { useRef } from 'react'

const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -40, transition: { duration: 0.4 } },
}

interface RevealProps {
    children: React.ReactNode
    amount?: number | 'some' | 'all'
}

export default function Reveal({ children, amount = 0.3 }: RevealProps) {
    const ref = useRef(null)
    const inView = useInView(ref, {
        once: false,
        amount,
        margin: '0px 0px -50px 0px',
    })

    return (
        <div ref={ref} className="reveal-component relative overflow-hidden">
            <motion.div
                variants={variants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                exit="exit"
                className="will-change-transform"
                style={{
                    backfaceVisibility: 'hidden',
                    perspective: 1000,
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}
