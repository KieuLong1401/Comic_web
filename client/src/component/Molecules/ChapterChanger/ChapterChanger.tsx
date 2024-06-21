'use client'
import styles from './ChapterChanger.module.css'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip/Tooltip'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import getChapter from '@/services/getChapter'
import { useEffect, useState } from 'react'

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
    const [chapterList, setChapterList] = useState<number[]>([])

    const currentChapter: number = chapter
    const nextChapterIndex: number = currentChapter + 1
    const preChapterIndex: number = currentChapter - 1
    const chapterLength: number = chapterList.length

    useEffect((): void => {
        getChapter(comic).then((res) =>
            setChapterList(res.map((e) => e.chap_num))
        )
    }, [comic])

    return (
        <div className={`${styles.container} ${className ? className : ''}`}>
            <Link
                href={`/comic/${comic}/${chapterList[preChapterIndex]}`}
                className={preChapterIndex < 0 ? styles.disabled : ''}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <button
                id='chapterMenu'
                className={styles.chapterMenu}
            >{`chapter ${currentChapter}`}</button>
            <Tooltip
                trigger='click'
                triggerElementId='chapterMenu'
                className={styles.chapterMenuDropDown}
            >
                {chapterList.map((e) => {
                    return (
                        <Link
                            href={`/comic/${comic}/${e}`}
                            className={styles.chapterLink}
                        >
                            chapter {e}
                        </Link>
                    )
                })}
            </Tooltip>
            <Link
                href={`/comic/${comic}/${chapterList[nextChapterIndex]}`}
                className={
                    nextChapterIndex > chapterLength ? styles.disabled : ''
                }
            >
                <FontAwesomeIcon icon={faArrowRight} />
            </Link>
        </div>
    )
}

export default ChapterChanger
