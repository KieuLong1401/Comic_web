'use client'

import Link from 'next/link'
import styles from './SignAction.module.css'
import { useEffect, useState } from 'react'

export default ({ className }: { className?: string }) => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        if (localStorage.getItem('user') == null) return
        setUser(JSON.parse(localStorage.getItem('user') as string))
    }, [])

    return user ? (
        <div className={className}>{user.name}</div>
    ) : (
        <div className={`${styles.buttonContainer} ${className}`}>
            <button className={styles.loginBtn}>
                <Link href={'/login'}>Login</Link>
            </button>
            <button className={styles.registerBtn}>
                <Link href={'/register'}>Sign up</Link>
            </button>
        </div>
    )
}
