import styles from './chapter.module.css'

import getChapterId from '@/services/getChapterId'
import getImage from '@/services/getImage'
import ImageList from '@/component/Molecules/ImageList/ImageList'
import { Suspense } from 'react'
import ReadingPageHeader from '@/component/Organisms/ReadingPageHeader/ReadingPageHeader'

const Chapter = async ({
    params,
}: {
    params: { comic: string; chapter: number }
}) => {
    const chapterId = await getChapterId(params.comic, params.chapter)
    const imageList = await getImage(chapterId)

    return (
        <div className={styles.container}>
            <ReadingPageHeader
                className={styles.header}
                comic={params.comic}
                chapter={params.chapter}
            />
            <Suspense fallback={<h1>loading...</h1>}>
                <ImageList imageList={imageList} />
            </Suspense>
        </div>
    )
}
export default Chapter
