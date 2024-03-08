import styles from './ComicList.module.css'

import { useEffect, useState } from 'react'

import Comic from '@/component/Molecules/Comic/Comic'
import Pagination from '@/component/Molecules/Pagination/Pagination'
import getComics from '@/services/getComics'

interface ComicListProps {
    page: number
}

const ComicList = async ({ page }: ComicListProps) => {
    const [comicsData, setComicsData] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const result = await getComics({
                    type: [],
                    sortBy: 'uploaded_time',
                    sortType: 'desc',
                    pageComicNum: 32,
                    page: 1,
                })
                setComicsData(result?.data)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New Comics</h1>
            <div className={styles.comicsContainer}>
                {comicsData.map((e, i: number) => {
                    return (
                        <Comic
                            data={e}
                            key={i}
                        />
                    )
                })}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    page={page}
                    lastPage={30}
                />
            </div>
        </div>
    )
}

export default ComicList
