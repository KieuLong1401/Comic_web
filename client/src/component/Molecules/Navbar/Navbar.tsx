'use client'

import styles from './Navbar.module.css'

import Link from 'next/link'
import Tooltip from '../Tooltip/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const categories = [
    { name: 'Action', description: 'this is description', href: 'action' },
    { name: 'Adult', description: 'this is description', href: 'adult' },
    {
        name: 'Adventure',
        description: 'this is description',
        href: 'adventure',
    },
    { name: 'Anime', description: 'this is description', href: 'anime' },
    {
        name: 'Chuyển Sinh',
        description: 'this is description',
        href: 'chuyen-sinh',
    },
    { name: 'Comedy', description: 'this is description', href: 'comedy' },
    { name: 'Comic', description: 'this is description', href: 'comic' },
    { name: 'Cooking', description: 'this is description', href: 'cooking' },
    { name: 'Cổ Đại', description: 'this is description', href: 'co-dai' },
    {
        name: 'Doujinshi',
        description: 'this is description',
        href: 'doujinshi',
    },
    { name: 'Drama', description: 'this is description', href: 'drama' },
    { name: 'Đam Mỹ', description: 'this is description', href: 'dam-my' },
    { name: 'Ecchi', description: 'this is description', href: 'ecchi' },
    { name: 'Fantasy', description: 'this is description', href: 'fantasy' },
    {
        name: 'Gender Bender',
        description: 'this is description',
        href: 'gender-bender',
    },
    { name: 'Harem', description: 'this is description', href: 'harem' },
    {
        name: 'Historical',
        description: 'this is description',
        href: 'historical',
    },
    { name: 'Horror', description: 'this is description', href: 'horror' },
    { name: 'Josei', description: 'this is description', href: 'josei' },
    {
        name: 'Live action',
        description: 'this is description',
        href: 'live-action',
    },
    { name: 'Manga', description: 'this is description', href: 'manga' },
    { name: 'Manhua', description: 'this is description', href: 'manhua' },
    { name: 'Manhwa', description: 'this is description', href: 'manhwa' },
    {
        name: 'Martial Arts',
        description: 'this is description',
        href: 'martial-art',
    },
    { name: 'Mature', description: 'this is description', href: 'mature' },
    { name: 'Mecha', description: 'this is description', href: 'mecha' },
    { name: 'Mystery', description: 'this is description', href: 'mystery' },
    {
        name: 'Ngôn Tình',
        description: 'this is description',
        href: 'ngon-tinh',
    },
    { name: 'One shot', description: 'this is description', href: 'one-shot' },
    {
        name: 'Psychological',
        description: 'this is description',
        href: 'psychological',
    },
    { name: 'Romance', description: 'this is description', href: 'romance' },
    {
        name: 'School Life',
        description: 'this is description',
        href: 'school-life',
    },
    { name: 'Sci-fi', description: 'this is description', href: 'sci-fi' },
    { name: 'Seinen', description: 'this is description', href: 'seinen' },
    { name: 'Shoujo', description: 'this is description', href: 'shoujo' },
    {
        name: 'Shoujo Ai',
        description: 'this is description',
        href: 'shoujo-ai',
    },
    { name: 'Shounen', description: 'this is description', href: 'shounen' },
    {
        name: 'Shounen Ai',
        description: 'this is description',
        href: 'shounen-ai',
    },
    {
        name: 'Slice of Life',
        description: 'this is description',
        href: 'slice of life',
    },
    { name: 'Smut', description: 'this is description', href: 'smut' },
    {
        name: 'Soft Yaoi',
        description: 'this is description',
        href: 'soft-yaoi',
    },
    {
        name: 'Soft Yuri',
        description: 'this is description',
        href: 'soft-yuri',
    },
    { name: 'Sports', description: 'this is description', href: 'sports' },
    {
        name: 'Supernatural',
        description: 'this is description',
        href: 'supernatural',
    },
    {
        name: 'Thiếu Nhi',
        description: 'this is description',
        href: 'thieu-nhi',
    },
    { name: 'Tragedy', description: 'this is description', href: 'tragedy' },
    {
        name: 'Trinh Thám',
        description: 'this is description',
        href: 'trinh-tham',
    },
    {
        name: 'Truyện scan',
        description: 'this is description',
        href: 'truyen-scan',
    },
    {
        name: 'Truyện Màu',
        description: 'this is description',
        href: 'truyen-mau',
    },
    { name: 'Webtoon', description: 'this is description', href: 'webtoon' },
    {
        name: 'Xuyên Không',
        description: 'this is description',
        href: 'xuyen-khong',
    },
]

interface NavbarProps {
    className?: string
    menuDrop?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ className, menuDrop = false }) => {
    const [description, setDescription] = useState('')
    const path = usePathname()

    var classes = `
        ${styles.container}
        ${menuDrop && styles.dropDown}
        ${className ? className : ''}
    `

    return (
        <nav className={classes}>
            <Link
                href={'/following'}
                style={
                    path == '/following'
                        ? { color: 'rgba(70, 130, 180, 1)' }
                        : {}
                }
            >
                Theo Dõi
            </Link>
            <Link
                href={'/history'}
                style={
                    path == '/history' ? { color: 'rgba(70, 130, 180, 1)' } : {}
                }
            >
                Lịch Sử
            </Link>
            <Link
                href={'/filter'}
                style={
                    path == '/filter' ? { color: 'rgba(70, 130, 180, 1)' } : {}
                }
            >
                Lọc Truyện
            </Link>
            <div
                className={styles.categoryBtn}
                id={menuDrop ? 'category_dropDown' : 'category'}
            >
                <h5>Thể Loại</h5>
                <FontAwesomeIcon
                    icon={faCaretDown}
                    className={styles.triangleIcon}
                />
            </div>

            <Tooltip
                triggerElementId={menuDrop ? 'category_dropDown' : 'category'}
                className={styles.categoryContainer}
                delay={menuDrop ? [0, 0] : [100, 250]}
                trigger={menuDrop ? 'click' : 'mouseenter'}
            >
                <div className={styles.categories}>
                    {categories.map((e, i) => (
                        <Link
                            className={styles.categoryItem}
                            onMouseEnter={() => setDescription(e.description)}
                            onMouseLeave={() => setDescription('')}
                            href={`/category/${e.href}`}
                            key={i}
                            style={
                                path == `/category/${e.href}`
                                    ? { color: 'rgba(70, 130, 180, 1)' }
                                    : {}
                            }
                        >
                            {e.name}
                        </Link>
                    ))}
                </div>
                {!menuDrop && (
                    <div className={styles.description}>{description}</div>
                )}
            </Tooltip>
            {menuDrop && (
                <div className={styles.accountLinkContainer}>
                    <Link href={'/login'}>Đăng Nhập</Link>
                    <Link href={'/register'}>Đăng Ký</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
