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
                src="/logo.jpg"
                alt="DoubleSS Logo"
                width={3320}
                height={1000}
                className="w-14 md:w-12"
            />
            <div className="hidden gap-8 md:flex">
                <a href={'#services'}>Services</a>
                <a href={'#quisommenous'}>Qui sommes nous</a>
                {/*<a href={'#temoignages'}>Témoignages</a>*/}
                <a href={'#reserver'}>Réserver ou Demander un Devis</a>
            </div>
            <a
                href={'#contact'}
                className="rounded-md bg-secondary px-4 py-2 text-black"
            >
                Contact
            </a>
        </m.nav>
    )
}

export default Navbar
