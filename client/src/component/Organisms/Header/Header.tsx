import styles from './Header.module.css'

import SearchBar from '@/component/Molecules/SearchBar/SeachBar'
import ThemeSwitch from '@/component/Molecules/ThemeSwitch/ThemeSwitch'
import Navbar from '@/component/Molecules/Navbar/Navbar'
import Menu from '@/component/Molecules/Menu/Menu'

import Link from 'next/link'

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
            <div className={styles.buttonContainer}>
                <button className={styles.loginBtn}>
                    <Link href={'/login'}>Đăng Nhập</Link>
                </button>
                <button className={styles.registerBtn}>
                    <Link href={'/register'}>Đăng Ký</Link>
                </button>
            </div>
            <Menu className={styles.menu} />
        </header>
    )
}
