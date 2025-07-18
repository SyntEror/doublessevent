'use client'

import languageDetector from '@/lib/i18n/languageDetector'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { locales } from '../../../next-i18n.config'

type Props = {
    className?: string
    showLabel?: boolean
}

const LanguageSwitcher = ({ className, showLabel = false }: Props) => {
    const path = usePathname()
    const { locale: currentLocale } = useParams()

    return (
        <div
            className={`${className} flex flex-col items-end text-base uppercase leading-normal tracking-wide`}
        >
            {showLabel && 'language'}
            <div className="flex flex-row items-end">
                {locales.map(locale => {
                    return (
                        <div
                            key={locale}
                            className={`after:px-2 after:content-['|'] last:after:content-none`}
                        >
                            <Link
                                href={path.replace(
                                    currentLocale as string,
                                    locale,
                                )}
                                onClick={() =>
                                    languageDetector?.cache &&
                                    languageDetector.cache(locale)
                                }
                                className={`${
                                    locale === currentLocale && 'text-red-500'
                                }`}
                            >
                                {locale === 'en' ? 'EN' : 'DE'}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LanguageSwitcher
