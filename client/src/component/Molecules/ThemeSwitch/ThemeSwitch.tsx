'use client'

import styles from '@/component/Molecules/ThemeSwitch/ThemeSwitch.module.css'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeSwitch({ className }: { className: string }) {
    const { theme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)

    var classes = styles.container
    if (className) {
        classes = classes + ' ' + className
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    function changeTheme() {
        setTheme(theme == 'dark' ? 'light' : 'dark')
        localStorage.setItem('theme', theme == 'dark' ? 'light' : 'dark')
    }

    if (!isMounted) {
        return <div className={classes}></div>
    } else {
        return (
            <div
                className={classes}
                onClick={changeTheme}
            >
                <div
                    className={styles.switch}
                    style={
                        theme == 'light' ? { left: '3px' } : { left: '32px' }
                    }
                ></div>
                <FontAwesomeIcon
                    icon={faSun}
                    style={{
                        width: '1rem',
                        height: '1rem',
                    }}
                    className={`${styles.sunIcon} ${
                        theme == 'light' ? styles.active : ''
                    }`}
                />
                <FontAwesomeIcon
                    icon={faMoon}
                    style={{
                        width: '1rem',
                        height: '1rem',
                    }}
                    className={`${styles.moonIcon} ${
                        theme == 'light' ? '' : styles.active
                    }`}
                />
            </div>
        )
    }
}

export default ThemeSwitch
