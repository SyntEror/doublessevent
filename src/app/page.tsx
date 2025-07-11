import { HeaderMedia } from '@/components/reusable/HeaderMedia'
import Quisommenous from '@/components/sections/Quisommenous'
import Services from '@/components/sections/Services'
import Stands from '@/components/sections/Stands'
import Head from 'next/head'
import { useMemo } from 'react'

export default function Home() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        headline: "DoubleSS Event - L'art de sublimer vos événements",
        name: 'DoubleSS Event',
        url: 'https://doublessevent.com',
        logo: 'https://doublessevent.com/logo.png',
        sameAs: [
            'https://www.facebook.com/doublessevent',
            'https://www.instagram.com/doublessevent',
            'https://www.linkedin.com/company/doublessevent',
        ],
        author: {
            '@type': 'organization',
            name: 'SyntaxEror Team',
        },
    }
    const sections = useMemo(() => [Quisommenous, Services, Stands], [])
    // , Galerie, Quisommenous, Reservation, Contacts

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
                <HeaderMedia />
                {sections.map((Component, index) => (
                    <div className="mx-10" key={index}>
                        <Component />
                    </div>
                ))}
            </main>
        </>
    )
}
