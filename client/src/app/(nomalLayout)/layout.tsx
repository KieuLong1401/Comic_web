'use sever'

import Header from '@/component/Organisms/Header/Header'
import Footer from '@/component/Organisms/Footer/Footer'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className={'scrollContainer'}>
                <div className='pageContainer'>{children}</div>
                <Footer />
            </div>
        </>
    )
}
