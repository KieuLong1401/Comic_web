import styles from './Footer.module.css'

import Link from 'next/link'

function Footer() {
    return (
        <div className={styles.container}>
            <span>Copyright &copy; </span>
            <Link
                href={'/contact'}
                className={styles.link}
            >
                Contact
            </Link>
            <Link
                href={'/privacy-policy'}
                className={styles.link}
            >
                Privacy Policy
            </Link>
        </div>
    )
}

export default Footer
