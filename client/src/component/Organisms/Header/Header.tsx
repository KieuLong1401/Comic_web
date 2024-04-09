import styles from './Header.module.css'

import SearchBar from '@/component/Molecules/SearchBar/SearchBar'
import ThemeSwitch from '@/component/Molecules/ThemeSwitch/ThemeSwitch'
import Navbar from '@/component/Molecules/Navbar/Navbar'
import Menu from '@/component/Molecules/Menu/Menu'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
                        <Link href={'/login'}>Login</Link>
                    </button>
                    <button className={styles.registerBtn}>
                        <Link href={'/register'}>Sign up</Link>
                    </button>
                </div>
            <Menu className={styles.menu} />
        </header>
    )
}
