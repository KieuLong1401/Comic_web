import styles from './ComicList.module.css'

import Comic from '@/component/Molecules/Comic/Comic'
import Pagination from '@/component/Molecules/Pagination/Pagination'
import getComics from '@/services/getComics'

interface ComicListProps {
    page: number
}

const ComicList = async ({ page }: ComicListProps) => {
    const comicsData = (
        await getComics({
            categories: [],
            sort_by: 'uploaded_time',
            sort_type: 'desc',
            page_comic_num: 36,
            page: 1,
        })
    )?.data

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>New Comics</h1>

            <div className={styles.comicsContainer}>
                {comicsData?.map((e, i: number) => {
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
