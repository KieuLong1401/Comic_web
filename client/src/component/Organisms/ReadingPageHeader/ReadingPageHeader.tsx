'use client'

import styles from './ReadingPageHeader.module.css'
import { faCircleArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import ChapterChanger from '../../Molecules/ChapterChanger/ChapterChanger'

export default ({ comic, chapter }: { comic: string; chapter: number }) => {
    return (
        <div className={styles.container}>
            <Link href='/'>
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link href={`/comic/${comic}`}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </Link>
            <ChapterChanger
                className={styles.chapterChanger}
                comic={comic}
                chapter={chapter}
            />
        </div>
    )
}
