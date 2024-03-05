import styles from './page.module.css'

import { NextPage } from 'next'

import ComicList from '@/component/Organisms/ComicList/ComicList'

interface PageProps {
    params: {
        page: string
    }
}

const Page: NextPage<PageProps> = ({ params }) => {
    return (
        <div className={styles.container}>
            <ComicList page={parseInt(params.page)} />
        </div>
    )
}
export default Page
