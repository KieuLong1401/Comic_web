import styles from './page.module.css'

import { NextPage } from 'next'
import { Suspense } from 'react'

import ComicList from '@/component/Organisms/ComicList/ComicList'

interface PageProps {
    params: {
        page: string
    }
}

const Page: NextPage<PageProps> = ({ params }) => {
    return (
        <div className={styles.container}>
            <Suspense fallback={<div>loading...</div>}>
                <ComicList page={parseInt(params.page)} />
            </Suspense>
        </div>
    )
}
export default Page
