import Link from 'next/link'
import styles from './SearchResult.module.css'
import React from 'react'
import Image from 'next/image'

interface SearchResultProps {
    data: {
        name: string
        otherName: string | null
        imgSrc: string
        newestChapter: number
        categories: Array<string>
        chapHref: string
        comicHref: string
    }
}

const SearchResult: React.FC<SearchResultProps> = ({ data }) => (
    <div className={styles.container}>
        <div className={styles.comic}>
            <Link
                href={data.comicHref}
                className={styles.image}
            >
                <Image
                    src={data.imgSrc}
                    alt='search result image'
                    fill={true}
                    unoptimized={true}
                    crossOrigin='anonymous'
                />
            </Link>
            <div className={styles.info}>
                <Link
                    href={data.comicHref}
                    className={styles.name}
                >
                    {data.name}
                </Link>
                {data.otherName && (
                    <h5 className={styles.otherName}>
                        {`other name: ${data.otherName}`}
                    </h5>
                )}

                <Link
                    href={data.chapHref}
                    className={styles.newestChapter}
                >
                    {`chapter ${data.newestChapter}`}
                </Link>
                <div className={styles.categoryContainer}>
                    <h5>category: </h5>
                    {data.categories.map((e, i) => {
                        return (
                            <Link
                                href={'/category/action'}
                                key={i}
                                className={styles.category}
                            >
                                {e}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
)

export default SearchResult
