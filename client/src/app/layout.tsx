'use sever'

import './globals.css'

import Header from '@/component/Organisms/Header/Header'
import Footer from '@/component/Organisms/Footer/Footer'
import Theme from '@/component/Atoms/Theme/Theme'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const roboto = Roboto({
    weight: ['500', '400'],
    style: 'normal',
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang='vi'
            className={roboto.className}
        >
            <body>
                <Theme>
                    <Header />
                    <div className={'scrollContainer'}>
                        <div className='pageContainer'>{children}</div>
                        <Footer />
                    </div>
                </Theme>
            </body>
        </html>
    )
}
