import { locales } from '../../../next-i18n.config'

export const getI18nParams = () => locales.map(lng => ({ locale: lng }))

export const generateStaticParams = () => getI18nParams()
