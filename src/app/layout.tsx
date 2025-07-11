import { env } from '@/env'
import { Footer } from '@/Layout/Footer'
import Navbar from '@/Layout/Navbar'
import { ClientProviders } from '@/lib/ClientProviders'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

const siteUrl = env.NEXT_PUBLIC_BASE_URL
const base = new URL(siteUrl)

export const metadata: Metadata = {
    metadataBase: base,
    title: "DoubleSS event - L'art de sublimer vos événements",
    description:
        "DoubleSS event est une entreprise spécialisée dans l'organisation d'événements uniques et mémorables. Notre équipe passionnée s'engage à transformer vos idées en réalité, en créant des expériences sur mesure qui laissent une empreinte indélébile.",
    icons: [{ rel: 'icon', url: 'https://www.doublessevent.com/logo.png' }],
    openGraph: {
        title: "DoubleSS event - L'art de sublimer vos événements",
        description:
            "DoubleSS event est une entreprise spécialisée dans l'organisation d'événements uniques et mémorables. Notre équipe passionnée s'engage à transformer vos idées en réalité, en créant des expériences sur mesure qui laissent une empreinte indélébile.",
        url: 'https://www.doublessevent.com',
        images: [
            {
                url: '/logo.png',
                width: 1200,
                height: 630,
                alt: 'DoubleSS event graph image',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "DoubleSS event - L'art de sublimer vos événements",
        description:
            "DoubleSS event est une entreprise spécialisée dans l'organisation d'événements uniques et mémorables. Notre équipe passionnée s'engage à transformer vos idées en réalité, en créant des expériences sur mesure qui laissent une empreinte indélébile.",
        images: ['https://www.doublessevent.com/logo.png'],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <title>
                    DoubleSS event - L&#39;art de sublimer vos événements
                </title>
                <link rel="icon" href="/logo.png" />
            </head>
            <body className="relative overflow-x-hidden">
                <Navbar />
                <ClientProviders>{children}</ClientProviders>
                <Footer />
            </body>
        </html>
    )
}
