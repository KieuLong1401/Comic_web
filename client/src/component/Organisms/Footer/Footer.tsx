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
                Liên hệ
            </Link>
            <Link
                href={'/privacy-policy'}
                className={styles.link}
            >
                Chính sách bảo mật
            </Link>
        </div>
    )
}

export default Footer
