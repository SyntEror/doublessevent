import languageDetector from 'next-language-detector'
import { fallbackLocale, locales } from '../../../next-i18n.config'

export default languageDetector({
    supportedLngs: locales,
    fallbackLng: fallbackLocale,
})
