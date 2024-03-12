'use client'

import styles from './Pagination.module.css'

import React, { useState } from 'react'

import Link from 'next/link'

interface PaginationProps {
    page: number
    lastPage: number
}

const Pagination: React.FC<PaginationProps> = ({ page, lastPage }) => {
    const [pageInputValue, setPageInputValue] = useState<string>('')
    const [inputErr, setInputErr] = useState<string | null>(null)

    const step = 2
    var startPage = 1
    var endPage = lastPage

    function handleChangePageInputValue(e) {
        const value: string = e.target.value
        const intValue = parseInt(value)
        if (value != '' && !value.match(/^[0-9]+$/)) return
        setPageInputValue(value)
        if (intValue < 1 || intValue > lastPage) {
            setInputErr(`Nhập số trong phạm vi (1-${lastPage})`)
            return
        }

        setInputErr(null)
    }

    if (lastPage > step * 2 + 3) {
        if (page > step + 3) {
            startPage = page - step
        }
        if (page < lastPage - (step + 2)) {
            endPage = page + step
        }
        if (page >= lastPage - (step + 3)) {
            startPage = lastPage - (step * 2 + 2)
        }
        if (page <= step + 3) {
            endPage = step * 2 + 3
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.preNextBtnContainer}>
                <Link
                    href={`/?page=${page - 1}`}
                    className={page <= 1 ? styles.disable : ''}
                >
                    Pre Page
                </Link>
                <Link
                    href={`/?page=${page + 1}`}
                    className={page >= lastPage ? styles.disable : ''}
                >
                    Next Page
                </Link>
            </div>
            <div className={styles.rowPaginationContainer}>
                {startPage > 3 && (
                    <>
                        <Link
                            href={'/'}
                            className={`${styles.pageLink} ${
                                page == 1 && styles.active
                            }`}
                        >
                            1
                        </Link>
                        <span>...</span>
                    </>
                )}

                {Array(endPage - startPage + 1)
                    .fill('')
                    .map((e, i) => {
                        return (
                            <Link
                                key={i}
                                href={
                                    startPage + i == 1
                                        ? '/'
                                        : `/?page=${startPage + i}`
                                }
                                className={`${styles.pageLink} ${
                                    page == startPage + i && styles.active
                                }`}
                            >
                                {startPage + i}
                            </Link>
                        )
                    })}

                {endPage < lastPage - 2 && (
                    <>
                        <span>...</span>
                        <Link
                            href={`/?page=${lastPage}`}
                            className={`${styles.pageLink}`}
                        >
                            {lastPage}
                        </Link>
                    </>
                )}
            </div>
            {inputErr && <h1 className={styles.errorWarn}>{inputErr}</h1>}

            <div className={styles.fastPagination}>
                <input
                    type='string'
                    inputMode='numeric'
                    min={1}
                    max={lastPage}
                    placeholder='Trang'
                    value={pageInputValue}
                    onChange={handleChangePageInputValue}
                />
                <Link
                    href={`/?page=${pageInputValue}`}
                    className={`${inputErr != null && styles.disable}`}
                >
                    Đến
                </Link>
            </div>
        </div>
    )
}

export default Pagination
