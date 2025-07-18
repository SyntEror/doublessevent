'use client'

import '@/lib/i18n/i18n' // this imports and runs the init logic
import i18n from '@/lib/i18n/i18n'
import { ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'

type Props = {
    children: ReactNode
    lang: string
}

export default function I18nProvider({ children, lang }: Props) {
    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
