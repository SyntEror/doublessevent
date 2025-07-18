'use client'

import useLocale from '@/hooks/useLocale'
import languageDetector from '@/lib/i18n/languageDetector'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useRedirect = (to = '') => {
    const router = useRouter()
    const path = usePathname()
    to = to || path
    const { locale } = useLocale()

    useEffect(() => {
        if (!path.startsWith(`/${locale}`) && path !== '/') {
            router.replace(`/${locale}${path}`)
            return
        }

        if (languageDetector.cache && locale) {
            languageDetector.cache(locale)
        }

        router.replace('/' + locale + to)
    })
}

export const Redirect = () => useRedirect()
export const getRedirect = (to: string) => () => useRedirect(to)
