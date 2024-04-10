'use client'

import Link from 'next/link'
import styles from './SignAction.module.css'
import { useEffect, useState } from 'react'

export default () => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (localStorage.getItem('user') == null) return
        setUser(JSON.parse(localStorage.getItem('user') as string))
    }, [])

    return user ? (
        <div>{user.name}</div>
    ) : (
        <div className={styles.buttonContainer}>
            <button className={styles.loginBtn}>
                <Link href={'/login'}>Login</Link>
            </button>
            <button className={styles.registerBtn}>
                <Link href={'/register'}>Sign up</Link>
            </button>
        </div>
    )
}
