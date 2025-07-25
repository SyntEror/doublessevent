'use client'

import SlideInText from '@/components/reusable/SlideInText'
import { useWindowSize } from '@/hooks/useWindowSize'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { type FC, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

export const HeaderMedia: FC = () => {
    const { isMobile } = useWindowSize()
    const HandleDesktopParallax = isMobile ? 'div' : Parallax

    const { t } = useTranslation('headermedia') // Load from headermedia.json
    const sublineFull = t('subline')
    const [typed, setTyped] = useState('')

    // Typewriter effect
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (typed.length < sublineFull.length) {
            timeout = setTimeout(() => {
                setTyped(sublineFull.slice(0, typed.length + 1))
            }, 50)
        }
        return () => clearTimeout(timeout)
    }, [typed, sublineFull])

    return (
        <div className="relative h-screen w-full overflow-hidden shadow">
            <HandleDesktopParallax speed={-120}>
                <Image
                    className="h-screen w-full object-cover"
                    src="/assets/event.jpg"
                    width={1920}
                    height={1080}
                    alt="background"
                    fetchPriority="high"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
                />
                {/* Animated Headline */}
                <div className="mx absolute bottom-0 top-0 z-20 flex flex-col items-center justify-center px-6 text-left md:px-32">
                    <SlideInText text={t('headline')} />
                </div>

                {/* Subline */}
                <div className="absolute bottom-2 left-2 z-20 px-8 text-zinc-100 sm:bottom-7 sm:left-7 sm:text-2xl md:px-28">
                    <div className="flex flex-row items-center font-['Mona-Sans']">
                        <motion.span
                            className="mr-1 leading-7 text-red-600"
                            animate={{
                                opacity: [1, 0.7, 1],
                                color: [
                                    '#dc2626',
                                    '#f87171',
                                    '#ef4444',
                                    '#dc2626',
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'loop',
                            }}
                        >
                            |
                        </motion.span>
                        <span>
                            {typed}
                            <motion.span
                                className="inline-block w-2"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                aria-hidden
                            >
                                |
                            </motion.span>
                        </span>
                    </div>
                </div>
            </HandleDesktopParallax>
        </div>
    )
}
