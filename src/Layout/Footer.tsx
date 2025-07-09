import Divider from '@/components/reusable/Divider'
import Image from 'next/image'
import { CiFacebook, CiLocationOn, CiMail, CiPhone } from 'react-icons/ci'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className="bg-galaxy-100/60 flex flex-col items-center gap-6 p-4 text-white backdrop-blur md:items-start">
            <div className="flex w-full flex-col items-center justify-between gap-y-10 md:flex-row md:items-start md:gap-y-0">
                <div className="flex-col space-y-2">
                    <Image
                        src="/logo.jpg"
                        alt="DoubleSS Logo"
                        width={3320}
                        height={1000}
                        className="ml-16 w-20"
                    />
                    <div className="pl-6 text-xs font-light text-gray-400">
                        L’art de sublimer vos événements
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <CiFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 text-gray-400 md:flex-row">
                    <a href={'#services'}>Services</a>
                    <a href={'#pricing'}>Galerie</a>
                    <a href={'#temoignages'}>Temoignages</a>
                    <a href={'#reserver'}>Reserver/demander un devis</a>
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-2 pr-4 text-xs text-gray-400">
                        <div className="flex gap-2">
                            <CiMail className="h-6 w-10" />
                            <div className="flex items-center">
                                info@doublessevent.com
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <CiPhone className="h-6 w-10" />
                            <div className="flex items-center">
                                +39 350 840 7378
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <CiLocationOn className="h-6 w-10" />
                            <div className="flex items-center">
                                {' '}
                                Via Leonardo Da Vinci (VA){' '}
                            </div>
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
