'use client'
import { useWindowSize } from '@/hooks/useWindowSize'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { type FC, useEffect, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

export const HeaderMedia: FC = () => {
    const { isMobile } = useWindowSize()
    const HandleDesktopParallax = isMobile ? 'div' : Parallax

    // Typewriter animation for subline
    const sublineFull = 'L’art de sublimer vos événements'
    const [typed, setTyped] = useState('')
    useEffect(() => {
        let timeout: NodeJS.Timeout
        if (typed.length < sublineFull.length) {
            timeout = setTimeout(
                () => setTyped(sublineFull.slice(0, typed.length + 1)),
                50,
            )
        }
        return () => clearTimeout(timeout)
    }, [typed])

    return (
        <div className="relative h-screen w-full overflow-hidden shadow">
            <HandleDesktopParallax speed={-120}>
                <Image
                    className="h-screen w-full object-cover"
                    src={'/assets/event.jpg'}
                    width={1920}
                    height={1080}
                    alt="background"
                    fetchPriority="high"
                    priority
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.15)',
                    }}
                />
                {/* Animated Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`mx absolute ${
                        true
                            ? 'bottom-0 top-0 md:px-32'
                            : 'left-2 top-1/2 pt-10 md:px-28'
                    } z-20 flex flex-col items-center justify-center px-6 text-left`}
                >
                    <motion.h1
                        initial={{
                            textShadow: '0 4px 24px #1114',
                            letterSpacing: '-0.05em',
                        }}
                        animate={{
                            textShadow: '0 2px 48px #f00b',
                            letterSpacing: '0.03em',
                        }}
                        transition={{
                            delay: 1,
                            duration: 1.2,
                            ease: 'easeInOut',
                        }}
                        className="px-4 text-7xl font-bold text-zinc-100 drop-shadow-lg sm:max-w-6xl md:px-0 md:text-8xl md:leading-[85px]"
                    >
                        Double SS events
                    </motion.h1>
                </motion.div>
                {/* Animated Subline */}
                <div className="absolute bottom-2 left-2 z-20 px-8 uppercase text-zinc-100 sm:bottom-7 sm:left-7 sm:text-xl md:px-28">
                    <div className="flex flex-row items-center font-['Mona-Sans']">
                        {/* Flickering pipe animation */}
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
                        {/* Typewriter effect */}
                        <span>
                            {typed}
                            <motion.span
                                className="inline-block w-2"
                                animate={{
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                }}
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
