'use client'
import useScrollDirection from '@/hooks/useScrollDirection'
import { m } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'

const Navbar: FC = () => {
    const { scrollDirection } = useScrollDirection()

    return (
        <m.nav
            className={
                `bg-galaxy-100/60 fixed z-50 flex w-full items-center justify-between overflow-x-hidden px-8 py-4 backdrop-blur transition-all duration-300 ease-in-out` +
                ` ${scrollDirection === 'down' ? '-top-24' : 'top-0'}`
            }
        >
            <Image
                src="/logo-light.png"
                alt="SyntaxEror Logo"
                width={3320}
                height={1000}
                className="w-36 md:w-52"
            />
            <div className="hidden gap-8 md:flex">
                <a href={'#services'}>Services</a>
                <a href={'#galerie'}>Galerie</a>
                <a href={'#temoignages'}>Témoignages</a>
                <a href={'#reserver'}>Réserver ou Demander un Devis</a>
                <a href={'#contacts'}>Contacts</a>
            </div>
            <a
                href={'#contact'}
                className="bg-primary/20 rounded-md px-4 py-2 text-white/95"
            >
                Contact
            </a>
        </m.nav>
    )
}

export default Navbar
