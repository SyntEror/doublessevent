'use client'
import { useEffect, useState } from 'react'

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<number | null>(null)
    useEffect(() => {
        const handleResize = () => setWindowSize(() => window.innerWidth)
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return {
        isMobile: windowSize && windowSize < 576,
        isTablet: windowSize && windowSize >= 576 && windowSize < 992,
        isDesktop: windowSize && windowSize >= 992,
        isSmallDesktop: windowSize && windowSize >= 992 && windowSize < 1200,
        isLargeDesktop: windowSize && windowSize >= 1200,
        isNormalDesktop: windowSize && windowSize > 1280 && windowSize <= 1440,
        isXLargeDesktop: windowSize && windowSize >= 1400,
        isXXLargeDesktop: windowSize && windowSize >= 1600,
        is4KDesktop: windowSize && windowSize >= 2000,
    }
}
