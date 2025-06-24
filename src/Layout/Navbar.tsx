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
                `fixed z-50 flex w-full items-center justify-between overflow-x-hidden bg-galaxy-100/60 px-8 py-4 backdrop-blur transition-all duration-300 ease-in-out` +
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
                <a href={'#pricing'}>Pricing</a>
                <a href={'#clients'}>Clients</a>
                <a href={'#about'}>About</a>
            </div>
            <a
                href={'#contact'}
                className="rounded-md bg-primary/20 px-4 py-2 text-white/95"
            >
                Contact
            </a>
        </m.nav>
    )
}

export default Navbar
