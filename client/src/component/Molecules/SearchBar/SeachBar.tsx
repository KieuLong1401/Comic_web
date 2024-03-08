'use client'

import styles from './SearchBar.module.css'

import React, { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import useDebounce from '@/hooks/useDebounce'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import SearchResult from '../SearchResult/SearchResult'

const SEARCH_RESULTS = [
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
    {
        name: 'Nền Văn Minh Nebula',
        otherName: null,
        imgSrc: 'https://st.nettruyenclub.com/data/comics/182/nen-van-minh-nebula.jpg',
        newestChapter: 27,
        categories: ['action', 'Fantasy', 'Manhwa', 'Truyện Màu'],
        chapHref: '/comic/nen-van-minh-nebula/27',
        comicHref: '/comic/nen-van-minh-nebula',
    },
]

interface SearchResultProps {
    name: string
    otherName: string | null
    imgSrc: string
    newestChapter: number
    categories: Array<string>
    chapHref: string
    comicHref: string
}

function SearchBar({ className }: { className: string }) {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchResultProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const formRef = useRef<HTMLFormElement>(null)
    const loadingTimeoutRef = useRef<number | undefined>(undefined)
    const searchInputRef: React.RefObject<HTMLInputElement> = useRef(null)

    const path = usePathname()
    const debouncedSearchValue = useDebounce(searchValue, 500)

    var classes = `${styles.container} ${className && className}`

    useEffect(() => {
        closeModel()
    }, [path])
    useEffect(() => {
        if (!isShow) return
        searchInputRef.current?.focus()
    }, [isShow])
    useEffect(() => {
        window.clearTimeout(loadingTimeoutRef.current)
        if (debouncedSearchValue == '') {
            changeSearchResult([])
            return
        }
        setIsLoading(true)
        loadingTimeoutRef.current = window.setTimeout(() => {
            changeSearchResult(SEARCH_RESULTS)
        }, 1500)
    }, [debouncedSearchValue])

    function closeModel() {
        setSearchValue('')
        setSearchResults([])
        setIsLoading(false)
        setIsShow(false)
        if (loadingTimeoutRef.current !== undefined) {
            window.clearTimeout(loadingTimeoutRef.current)
        }
    }
    function openModel() {
        setIsShow(true)
    }

    function handleSearchValueChange(e) {
        setSearchValue(e.target?.value.trim())
        setIsLoading(false)
        window.clearTimeout(loadingTimeoutRef.current)
    }
    function changeSearchResult(value: SearchResultProps[]) {
        setSearchResults(value)
        setIsLoading(false)
    }

    return (
        <>
            <div
                className={classes}
                onClick={openModel}
            >
                <div className={styles.placeHolder}>Search</div>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className={styles.searchBtn}
                />
            </div>
            <div
                className={`${styles.modelContainer} ${
                    isShow ? styles.show : ''
                }`}
            >
                <div
                    className={styles.modelBackground}
                    onClick={closeModel}
                ></div>
                <div className={styles.model}>
                    <div className={styles.modelHeader}>
                        <form
                            ref={formRef}
                            className={styles.search}
                        >
                            <button type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <input
                                type='text'
                                placeholder='Search'
                                value={searchValue}
                                onChange={handleSearchValueChange}
                                ref={searchInputRef}
                            />
                            {isLoading && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    width={15}
                                    height={15}
                                    fontSize={15}
                                    className={styles.loadingIcon}
                                />
                            )}
                        </form>
                        <button
                            onClick={closeModel}
                            className={styles.modelCloseBtn}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className={styles.searchResult}>
                        {searchResults.map((result, key) => (
                            <SearchResult
                                data={result}
                                key={key}
                            />
                        ))}
                        {searchResults.length > 0 && (
                            <button
                                className={styles.moreBtn}
                                onClick={() => formRef.current?.submit()}
                            >
                                More
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBar
