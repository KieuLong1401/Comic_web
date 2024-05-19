'use client'
import styles from './ChapterChanger.module.css'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip/Tooltip'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

interface comicProps {
    comic: string
    chapter: number
    className?: string
}

const ChapterChanger: React.FC<comicProps> = ({
    className,
    comic,
    chapter,
}) => {
    const intChapter = parseInt(chapter.toString())
    return (
        <div className={`${styles.container} ${className ? className : ''}`}>
            <Link href={`/comic/${comic}/${intChapter - 1}`}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <button
                id='chapterMenu'
                className={styles.chapterMenu}
            >{`chapter ${intChapter}`}</button>
            <Tooltip
                trigger='click'
                triggerElementId='chapterMenu'
            >
                <div>sdfg</div>
            </Tooltip>
            <Link href={`/comic/${comic}/${intChapter + 1}`}>
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    )
}

export default ChapterChanger
