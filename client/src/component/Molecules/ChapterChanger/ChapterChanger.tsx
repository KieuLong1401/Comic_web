'use client'
import styles from './ChapterChanger.module.css'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip/Tooltip'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import getChapter from '@/services/getChapter'
import { useEffect, useState } from 'react'
import { rejects } from 'assert'

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
    const [chapterList, setChapterList] = useState([])

    const intChapter = parseInt(chapter.toString())
    const nextChapter = intChapter + 1
    const preChapter = intChapter - 1
    const chapterLength = chapterList.length

    useEffect(() => {
        getChapter(comic).then((res) => setChapterList(res))
    }, [])

    return (
        <div className={`${styles.container} ${className ? className : ''}`}>
            <Link
                href={`/comic/${comic}/${preChapter}`}
                className={preChapter < 1 ? styles.disabled : ''}
            >
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
            <Link
                href={`/comic/${comic}/${nextChapter}`}
                className={nextChapter > chapterLength ? styles.disabled : ''}
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    )
}

export default ChapterChanger
