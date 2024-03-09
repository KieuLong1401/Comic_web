import styles from './Comic.module.css'

import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'

interface comicProps {
    data: {
        id: string
        title: string
        comic_image_src: string
        views: string
        vote: number
        chapters: { chap_num: number; uploaded_time: string }[]
    }
}

const Comic: React.FC<comicProps> = async ({ data }) => {
    const comicHref = '/comic/' + data.id

    return (
        <div className={styles.container}>
            <Link
                href={comicHref}
                className={styles.image}
            >
                <Image
                    src={data.comic_image_src}
                    alt=''
                    fill={true}
                    sizes='(max-width: 768px) 100vw'
                />
                <div className={styles.info}>
                    <div className={styles.viewInfo}>
                        <FontAwesomeIcon
                            icon={faEye}
                            fontSize={13}
                            color='white'
                        />
                        <span>{data.views}</span>
                    </div>
                    <div className={styles.voteInfo}>
                        <FontAwesomeIcon
                            icon={faStar}
                            fontSize={13}
                            color='white'
                        />
                        <span>{data.vote}</span>
                    </div>
                </div>
            </Link>
            <Link
                href={comicHref}
                className={styles.comicName}
            >
                {data.title}
            </Link>
            <div className={styles.newestChapterContainer}>
                {data.chapters.map((e, i) => {
                    const currentTime: any = new Date()
                    const uploaded_time: any = new Date(e.uploaded_time)

                    const diffMinutes = Math.floor(
                        (currentTime - uploaded_time) / 1000 / 60
                    )
                    const diffHours = Math.floor(diffMinutes / 60)
                    const diffDays = Math.floor(diffHours / 24)
                    const diffMonths = Math.floor(diffDays / 30)
                    const diffYears = Math.floor(diffMonths / 12)

                    return (
                        <div
                            className={styles.chapterContainer}
                            key={i}
                        >
                            <Link href={'/'}>chapter {e.chap_num}</Link>
                            <span className={styles.postedTime}>{`${
                                diffYears > 0
                                    ? diffYears
                                    : diffMonths > 0
                                    ? diffMonths
                                    : diffDays > 0
                                    ? diffDays
                                    : diffHours > 0
                                    ? diffHours
                                    : diffMinutes > 0
                                    ? diffMinutes
                                    : 1
                            }${
                                diffYears > 0
                                    ? 'y'
                                    : diffMonths > 0
                                    ? 'm'
                                    : diffDays > 0
                                    ? 'd'
                                    : diffHours > 0
                                    ? 'h'
                                    : 'm'
                            } ago`}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comic
