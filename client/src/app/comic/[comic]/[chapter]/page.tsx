'use client'
import styles from './chapter.module.css'

import getChapterId from '@/services/getChapterId'
import getImage from '@/services/getImage'
import Image from 'next/image'

const Chapter = async ({
    params,
}: {
    params: { comic: string; chapter: number }
}) => {
    const chapterId = await getChapterId(params.comic, params.chapter)
    const imageList = await getImage(chapterId)

    return (
        <div className={styles.container}>
            {imageList.map((e, i) => {
                return (
                    <Image
                        src={e.image_src}
                        alt=''
                        width={995}
                        height={2239}
                        style={{
                            display: 'block',
                            position: 'unset',
                            width: '600px',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                        }}
                        key={i}
                    />
                )
            })}
        </div>
    )
}
export default Chapter
