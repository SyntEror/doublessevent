import Divider from '@/components/reusable/Divider'
import Image from 'next/image'
import { CiFacebook, CiLocationOn, CiMail, CiPhone } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
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
                        L’art de sublimer vos événements
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
                    <a
                        className="underline-offset-2 hover:underline"
                        href={'#services'}
                    >
                        Services
                    </a>
                    <a
                        className="underline-offset-2 hover:underline"
                        href={'#quisommenous'}
                    >
                        Qui sommes nous
                    </a>
                    {/*<a href={'#temoignages'}>Témoignages</a>*/}
                    <a
                        className="underline-offset-2 hover:underline"
                        href={'#reserver'}
                    >
                        Réserver ou Demander un Devis
                    </a>
                    <a
                        className="underline-offset-2 hover:underline"
                        href={'#stands'}
                    >
                        Nos offre de stands
                    </a>
                </div>
                <div className="my-auto flex">
                    <div className="flex flex-col gap-2 pr-4 text-xs text-gray-400">
                        <div className="flex gap-2">
                            <CiMail className="h-6 w-10" />
                            <a
                                href="mailto:info@doublessevent.com"
                                className="flex items-center"
                            >
                                info@doublessevent.com
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <CiPhone className="h-6 w-10" />
                            <a
                                href="tel:+393508407378"
                                className="flex items-center"
                            >
                                +39 350 840 7378
                            </a>
                        </div>
                        <div className="flex gap-2">
                            <CiLocationOn className="h-6 w-10" />

                            <a
                                className="flex items-center"
                                href={'#localisation'}
                            >
                                Via Leonardo Da Vinci (VA)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Divider background={'bg-gray-500'} className="opacity-40" />
            <div className="container mx-auto text-center">
                <p className="text-sm text-gray-400">
                    © 2025 Copyright. TVA: 03903010126.
                </p>
            </div>
        </footer>
    )
}
