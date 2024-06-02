'use client'

import styles from './ReadingPageHeader.module.css'
import { faCircleArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import ChapterChanger from '../../Molecules/ChapterChanger/ChapterChanger'
import { useCallback, useEffect, useState } from 'react'

export default ({
    comic,
    chapter,
    className,
}: {
    comic: string
    chapter: number
    className?: string
}) => {
    const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false)
    var lastScrollPos = 0

    const scrollHandler = useCallback(() => {
        const scrolled = window.scrollY

        if (lastScrollPos < scrolled) {
            setIsScrollingDown(true)
        } else {
            setIsScrollingDown(false)
        }
        lastScrollPos = scrolled
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [scrollHandler])

    return (
        <div
            className={`${styles.container} ${className}`}
            style={{ visibility: isScrollingDown ? 'hidden' : 'visible' }}
        >
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
