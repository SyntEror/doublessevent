import { Footer } from '@/Layout/Footer'
import Navbar from '@/Layout/Navbar'
import { ClientProviders } from '@/lib/ClientProviders'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
    title: "DoubleSS event - L'art de sublimer vos événements",
    description:
        "DoubleSS event est une entreprise spécialisée dans l'organisation d'événements uniques et mémorables. Notre équipe passionnée s'engage à transformer vos idées en réalité, en créant des expériences sur mesure qui laissent une empreinte indélébile.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en">
            <body className="relative overflow-x-hidden">
                <Navbar />
                <ClientProviders>{children}</ClientProviders>
                <Footer />
            </body>
        </html>
    )
}
