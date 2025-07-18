'use client'
import { Footer } from '@/Layout/Footer'
import Head from 'next/head'
import { type ReactNode } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import Navbar from './Navbar'

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    // const Layout = ({ children }: Props) => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        headline: "DoubleSS Event - L'art de sublimer vos événements",
        name: 'DoubleSS Event',
        url: 'https://doublessevent.com',
        logo: 'https://doublessevent.com/logo.png',
        sameAs: [
            'https://www.facebook.com/sonia.bentelharmassi',
            'https://www.instagram.com/doubless.event',
        ],
        author: {
            '@type': 'organization',
            name: 'SyntaxEror Team',
        },
    }
    return (
        <>
            <Head>
                <title>DoubleSS | L&#39;art de sublimer vos événements</title>
                <meta
                    name="description"
                    content="DoubleSS event est une entreprise spécialisée dans l'organisation d'événements uniques et mémorables."
                />
                <meta property="og:title" content="DoubleSS Events" />
                <meta
                    property="og:description"
                    content="Avec DoubleSS event, transformez vos idées en réalité."
                />
                <meta
                    property="og:image"
                    content="https://doublessevent.com/logo.png"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </Head>
            <main>
                <Navbar />
                <ParallaxProvider>{children}</ParallaxProvider>
                <Footer />
            </main>
        </>
    )
}

export default Layout
