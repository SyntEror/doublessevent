import Layout from '@/Layout/Layout'
import { generateStaticParams } from '@/lib/i18n/staticParams'
import { type ReactNode } from 'react'

export { generateStaticParams }

type Props = {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
    return <Layout>{children}</Layout>
}
