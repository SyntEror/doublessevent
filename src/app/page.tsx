import Reveal from '@/components/reusable/Reveal'
import Contacts from '@/components/sections/Contacts'
import Galerie from '@/components/sections/Galerie'
import Reservation from '@/components/sections/Reservation'
import Services from '@/components/sections/Services'
import Temoignages from '@/components/sections/Temoignages'
import { useMemo } from 'react'

export default function Home() {
    const sections = useMemo(
        () => [Services, Galerie, Temoignages, Reservation, Contacts],
        [],
    )

    return sections.map((Component, index) => (
        <Reveal key={index}>
            <div className="mx-10">
                <Component />
            </div>
        </Reveal>
    ))
}
