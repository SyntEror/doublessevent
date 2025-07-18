import { HeaderMedia } from '@/components/reusable/HeaderMedia'
import Quisommenous from '@/components/sections/Quisommenous'
import Services from '@/components/sections/Services'
import Stands from '@/components/sections/Stands'
import { ComponentType } from 'react'

const components: Record<string, ComponentType<unknown>> = {
    Quisommenous,
    Services,
    Stands,
} as Record<string, ComponentType<unknown>>

export default async function Home() {
    return (
        <>
            <HeaderMedia />
            {Object.entries(components).map(([key, Component]) => {
                return (
                    <div className="mx-10" key={key}>
                        <Component />
                    </div>
                )
            })}
        </>
    )
}
