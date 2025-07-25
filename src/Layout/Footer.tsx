'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { CiFacebook } from 'react-icons/ci'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
    const { t } = useTranslation('footer')
    const { t: tt } = useTranslation('navbar')
    const rawLinks = tt('links', { returnObjects: true })
    const links = Array.isArray(rawLinks) ? rawLinks : []

    return (
        <footer className="bg-galaxy-100/60 px-4 py-12 font-inter text-gray-400 backdrop-blur">
            <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                {/* Logo + slogan + social */}
                <div className="space-y-4">
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
                            className="ml-16 w-24"
                        />
                    </button>
                    <p className="text-sm leading-relaxed">{t('slogan')}</p>
                    <div className="flex space-x-5 pt-2">
                        <a
                            href="https://www.facebook.com/sonia.bentelharmassi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform text-gray-500 transition-transform hover:scale-110 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                            <CiFacebook size={28} />
                        </a>
                        <a
                            href="https://www.instagram.com/doubless.event/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform text-gray-500 transition-transform hover:scale-110 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
                        >
                            <FaInstagram size={28} />
                        </a>
                        <a
                            href="https://wa.me/393508407378"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform text-gray-500 transition-transform hover:scale-110 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp size={28} />
                        </a>
                        <a
                            href="mailto:info@doublessevent.com"
                            className="transform text-gray-500 transition-transform hover:scale-110 hover:text-red-400 dark:text-gray-400 dark:hover:text-red-400"
                            aria-label="Email"
                        >
                            <MdEmail size={28} />
                        </a>
                    </div>
                </div>

                {/* Liens rapides / Link utili */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary">
                        {t('quickLinks')}
                    </h3>
                    <div className="flex flex-col space-y-3">
                        {links.map((link, idx) =>
                            link.href ? (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className="hover:underline"
                                >
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
                </div>

                {/* Ressources / Risorse */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary">
                        {t('resources')}
                    </h3>
                    <ul className="space-y-3">
                        <li>
                            <a href="#" className="footer-link">
                                {t('faq')}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                {t('legalNotice')}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                {t('privacyPolicy')}
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                {t('terms')}
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4" id="contact">
                    <h3 className="text-xl font-bold text-primary">
                        {t('contactUs')}
                    </h3>
                    <a className="flex items-center" href="#localisation">
                        📍 {t('contact.location')}
                    </a>
                    <p>
                        📞{' '}
                        <a
                            href={`tel:${t('contact.phone')}`}
                            className="hover:underline"
                        >
                            {t('contact.phone')}
                        </a>
                    </p>
                    <p>
                        📧{' '}
                        <a
                            href={`mailto:${t('contact.email')}`}
                            className="hover:underline"
                        >
                            {t('contact.email')}
                        </a>
                    </p>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-6 flex flex-col border-t border-gray-200 pt-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400 md:gap-y-2">
                <p>{t('copyright', { year: new Date().getFullYear() })}</p>
                <p>{t('vat')}</p>
                <div className="flex items-center justify-center gap-1">
                    <span>{t('builtBy')}</span>
                    <a
                        href="https://www.syntaxeror.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        <Image
                            src="/logo-small.png"
                            alt="SyntaxEror Logo"
                            width={30}
                            height={20}
                            className="ml-1 h-[20px] w-[20px]"
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
