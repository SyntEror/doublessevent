import { HeaderMedia } from '@/components/reusable/HeaderMedia'
import Reveal from '@/components/reusable/Reveal'
import Services from '@/components/sections/Services'
import { useMemo } from 'react'

export default function Home() {
    const sections = useMemo(() => [Services], [])
    // , Galerie, Temoignages, Reservation, Contacts

    return (
        <>
            <HeaderMedia />
            {sections.map((Component, index) => (
                <Reveal key={index}>
                    <div className="mx-10">
                        <Component />
                    </div>
                </Reveal>
            ))}
        </>
    )
}
