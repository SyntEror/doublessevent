import Divider from '@/components/reusable/Divider'
import LanguageSwitcher from '@/components/reusable/LanguageSwitcher'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { CiFacebook, CiLocationOn, CiMail, CiPhone } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
    const { t } = useTranslation('footer')
    const { t: tt } = useTranslation('navbar')
    const links = tt('links', { returnObjects: true }) as {
        label: string
        href?: string
    }[]

    return (
        <footer className="flex flex-col items-center gap-6 bg-galaxy-100/60 p-4 text-white backdrop-blur md:items-start">
            <div className="flex w-full flex-col items-center justify-between gap-y-10 md:flex-row md:items-start md:gap-y-0">
                <div className="my-auto flex flex-col space-y-2">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                        aria-label="Scroll to top"
                    >
                        <Image
                            src="/logo.png"
                            alt="DoubleSS Logo"
                            width={3320}
                            height={1000}
                            className="ml-16 w-20"
                        />
                    </button>
                    <div className="pl-6 text-xs font-light text-gray-400">
                        {t('slogan')}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <a
                            href="https://www.facebook.com/sonia.bentelharmassi"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <CiFacebook className="h-8 w-8" />
                        </a>
                        <a
                            href="https://www.instagram.com/doubless.event/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="h-8 w-8" />
                        </a>
                    </div>
                </div>
                <div className="my-auto flex flex-col items-center justify-center gap-8 text-gray-400 md:flex-row">
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
                <div className="my-auto flex">
                    <div className="flex flex-col gap-2 pr-4 text-xs text-gray-400">
                        <div className="flex gap-2">
                            <CiMail className="h-6 w-10" />
                            <a
                                href={`mailto:${t('contact.email')}`}
                                className="flex items-center"
                            >
                                {t('contact.email')}
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <CiPhone className="h-6 w-10" />
                            <a
                                href={`tel:${t('contact.phone')}`}
                                className="flex items-center"
                            >
                                {t('contact.phone')}
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <CiLocationOn className="h-6 w-10" />
                            <a
                                className="flex items-center"
                                href="#localisation"
                            >
                                {t('contact.location')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Divider background="bg-gray-500" className="opacity-40" />

            <div className="flex w-full flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:justify-between md:text-left">
                <LanguageSwitcher />

                <p className="order-last text-xs text-gray-400 md:order-none md:text-sm">
                    {t('copyright')}
                </p>

                <a
                    href="https://www.syntaxeror.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-400 hover:underline"
                    aria-label={t('builtBy')}
                >
                    {t('builtBy')}
                    <Image
                        src="/logo-small.png"
                        alt="SyntaxEror Logo"
                        width={30}
                        height={20}
                        className="ml-1 h-[20px] w-[20px]"
                    />
                </a>
            </div>
        </footer>
    )
}
