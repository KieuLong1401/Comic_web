import styles from './page.module.css'

import { NextPage } from 'next'

import ComicList from '@/component/Organisms/ComicList/ComicList'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <ComicList page={1} />
        </div>
    )
}
export default Home
