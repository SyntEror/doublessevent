// lib/i18n.ts
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { fallbackLocale, locales } from '../../../next-i18n.config'

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: fallbackLocale,
        supportedLngs: locales,
        debug: false,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        defaultNS: 'common',
        ns: ['common', 'headermedia'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    })

export default i18n
