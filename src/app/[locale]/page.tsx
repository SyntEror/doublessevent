import { HeaderMedia } from '@/components/reusable/HeaderMedia'
import Quisommenous from '@/components/sections/Quisommenous'
import Services from '@/components/sections/Services'
import Stands from '@/components/sections/Stands'
import { useMemo } from 'react'

export default function Home() {
    const sections = useMemo(() => [Quisommenous, Services, Stands], [])
    // , Galerie, Quisommenous, Reservation, Contacts

    return (
        <>
            <HeaderMedia />
            {sections.map((Component, index) => (
                <div className="mx-10" key={index}>
                    <Component />
                </div>
            ))}
        </>
    )
}
