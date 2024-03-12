import styles from './page.module.css'

import { NextPage } from 'next'
import { Suspense } from 'react'

import ComicList from '@/component/Organisms/ComicList/ComicList'

const Page: NextPage = ({
    searchParams,
}: {
    searchParams?: { [page: string]: string | undefined }
}) => {
    const page = parseInt(searchParams?.page as string) || 1

    return (
        <div className={styles.container}>
            <Suspense fallback={<div>loading...</div>}>
                <ComicList page={page} />
            </Suspense>
        </div>
    )
}
export default Page
