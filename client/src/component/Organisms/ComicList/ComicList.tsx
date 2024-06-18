import styles from './ComicList.module.css'

import Comic from '@/component/Molecules/Comic/Comic'
import Pagination from '@/component/Molecules/Pagination/Pagination'
import getComics from '@/services/getComics'

interface ComicListProps {
    page: number
}

const ComicList = async ({ page }: ComicListProps) => {
    const comicsData = await getComics({
        page,
    })

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New Comics</h1>

            <div className={styles.comicsContainer}>
                {comicsData?.comics.map((e, i: number) => {
                    return (
                        <Comic
                            data={e}
                            key={i}
                        />
                    )
                })}
                {comicsData?.comics.map((e, i: number) => {
                    return (
                        <Comic
                            data={e}
                            key={i}
                        />
                    )
                })}
                {comicsData?.comics.map((e, i: number) => {
                    return (
                        <Comic
                            data={e}
                            key={i}
                        />
                    )
                })}
                {comicsData?.comics.map((e, i: number) => {
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
                    lastPage={comicsData.page}
                />
            </div>
        </div>
    )
}

export default ComicList
