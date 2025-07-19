'use client'
import LanguageSwitcher from '@/components/reusable/LanguageSwitcher'
import useScrollDirection from '@/hooks/useScrollDirection'
import { m } from 'framer-motion'
import Image from 'next/image'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Navbar: FC = () => {
    const { scrollDirection } = useScrollDirection()
    const { t } = useTranslation('navbar')
    const rawLinks = t('links', { returnObjects: true })
    const links = Array.isArray(rawLinks) ? rawLinks : []

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
            <div className="gap-8 md:flex">
                {links.map((link, idx) =>
                    link.href ? (
                        <a key={idx} href={link.href}>
                            {link.label}
                        </a>
                    ) : (
                        <span
                            key={idx}
                            className="cursor-not-allowed text-gray-400"
                        >
                            {link.label}
                        </span>
                    ),
                )}
            </div>
            <LanguageSwitcher />
        </m.nav>
    )
}

export default Navbar
