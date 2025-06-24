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
                        src="/logo-light.png"
                        alt="SyntaxEror Logo"
                        width={3320}
                        height={1000}
                        className="w-40"
                    />
                    <div className="pl-6 text-xs font-light text-gray-400">
                        It&#39;s a feature not a bug
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <CiFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>
                <div className="flex justify-center gap-8 text-gray-400">
                    <a href={'#services'}>Services</a>
                    <a href={'#pricing'}>Pricing</a>
                    <a href={'#clients'}>Clients</a>
                    <a href={'#about'}>About</a>
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-2 pr-4 text-xs text-gray-400">
                        <div className="flex justify-center gap-2">
                            <CiMail className="h-6 w-10" />
                            <div className="flex items-center">
                                info@syntaxeror.com
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <CiPhone className="h-6 w-10" />
                            </div>

                            <div className="flex flex-col items-center">
                                <div>+216 55 135 774 </div>
                                <div>+216 55 850 259 </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <CiLocationOn className="h-6 w-10" />
                            <div className="flex flex-col justify-center text-xs">
                                <div> 11 makther street </div>
                                <div> Borj louzir, Ariena </div>
                                <div> Tunisia </div>
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
