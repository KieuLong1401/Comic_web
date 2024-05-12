import styles from './Header.module.css'

import SearchBar from '@/component/Molecules/SearchBar/SearchBar'
import ThemeSwitch from '@/component/Molecules/ThemeSwitch/ThemeSwitch'
import Navbar from '@/component/Molecules/Navbar/Navbar'
import Menu from '@/component/Molecules/Menu/Menu'

import Link from 'next/link'
import SignAction from '@/component/Molecules/Tooltip/SignAction/SignAction'

export default function Header() {
    return (
        <header className={styles.container}>
            <Link
                href={'/'}
                className={styles.logo}
            >
                Logo
            </Link>
            <Navbar className={styles.navbar} />
            <SearchBar className={styles.searchBar} />
            <ThemeSwitch className={styles.themeSwitch} />

            <SignAction className={styles.signAction} />
            <Menu className={styles.menu} />
        </header>
    )
}
