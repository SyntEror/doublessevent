'use client'
import I18nProvider from '@/components/i18nProvider'
import Layout from '@/Layout/Layout'
import { ReactNode, use } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

type Params = Promise<{ locale: string }>
type Props = {
    children: ReactNode
    params: Params
}

export default function RootLayout({ children, params }: Props) {
    const { locale } = use(params)
    return (
        <I18nProvider lang={locale}>
            <Layout>
                <ParallaxProvider>{children}</ParallaxProvider>
            </Layout>
        </I18nProvider>
    )
}
