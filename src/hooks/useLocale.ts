'use client'
import languageDetector from '@/lib/i18n/languageDetector'

const useLocale = () => {
    let locale
    if (typeof window !== 'undefined')
        locale = localStorage.getItem('i18nextLng') ?? languageDetector.detect()
    else locale = languageDetector.detect()

    return { locale }
}

export default useLocale
