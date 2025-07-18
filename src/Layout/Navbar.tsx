'use client'
import LanguageSwitcher from '@/components/reusable/LanguageSwitcher'
import useScrollDirection from '@/hooks/useScrollDirection'
import { m } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'

const Navbar: FC = () => {
    const { scrollDirection } = useScrollDirection()

    return (
        <m.nav
            className={
                `fixed z-50 flex w-full items-center justify-between overflow-x-hidden bg-galaxy-100/20 px-8 py-1 backdrop-blur transition-all duration-300 ease-in-out` +
                ` ${scrollDirection === 'down' ? '-top-24' : 'top-0'}`
            }
        >
            <Image
                src="/logo.png"
                alt="DoubleSS Logo"
                width={3320}
                height={1000}
                className="w-16 md:w-20"
            />
            <div className="hidden gap-8 md:flex">
                <a href={'#services'}>Services</a>
                <a href={'#quisommenous'}>Qui sommes nous</a>
                {/*<a href={'#temoignages'}>Témoignages</a>*/}
                <a className="cursor-not-allowed text-gray-400">
                    Réserver ou Demander un Devis
                </a>
                <a href={'#stands'}>Nos offre de stands</a>
            </div>
            <LanguageSwitcher />
            {/*<a*/}
            {/*    href={'#contact'}*/}
            {/*    className="rounded-md bg-secondary px-4 py-2 text-black"*/}
            {/*>*/}
            {/*    Contact*/}
            {/*</a>*/}
        </m.nav>
    )
}

export default Navbar
