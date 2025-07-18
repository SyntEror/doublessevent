'use client'

import { ParallaxProvider } from 'react-scroll-parallax'

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return <ParallaxProvider>{children}</ParallaxProvider>
}
