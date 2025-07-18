import Layout from '@/Layout/Layout'
import { generateStaticParams } from '@/lib/i18n/staticParams'
import { ReactNode } from 'react'

export { generateStaticParams }

type Params = Promise<{ locale: string }>
type Props = {
    children: ReactNode
    params: Params
}

export default async function RootLayout({ children, params }: Props) {
    return <Layout params={params}>{children}</Layout>
}
