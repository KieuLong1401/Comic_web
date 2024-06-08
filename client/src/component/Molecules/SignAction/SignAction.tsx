'use client'

import Link from 'next/link'
import styles from './SignAction.module.css'
import { useEffect, useState } from 'react'
import DisableSSR from '@/component/Atoms/DisableSSR/DisableSSR'

export default ({ className }: { className?: string }) => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (localStorage.getItem('user') == null) return
        setUser(JSON.parse(localStorage.getItem('user') as string))
    }, [])

    return (
        <div className={`${className} ${styles.container}`}>
            {user ? (
                <h1 className={styles.userName}>{user.name}</h1>
            ) : (
                <div className={styles.buttonContainer}>
                    <button className={styles.loginBtn}>
                        <Link href={'/login'}>Login</Link>
                    </button>
                    <button className={styles.registerBtn}>
                        <Link href={'/register'}>Sign up</Link>
                    </button>
                </div>
            )}
        </div>
    )
}
