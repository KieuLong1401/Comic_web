'use client'

import Navbar from '../Navbar/Navbar'

import styles from './Menu.module.css'
import Tooltip from '../Tooltip/Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

function Menu({ className }: { className?: string }) {
    return (
        <div className={className && className}>
            <button
                className={styles.container}
                id='menuBtn'
            >
                <FontAwesomeIcon
                    icon={faBars}
                    className={styles.barsIcon}
                />
            </button>
            <Tooltip
                className={styles.dropDown}
                triggerElementId='menuBtn'
                trigger='click'
            >
                <Navbar menuDrop />
            </Tooltip>
        </div>
    )
}

export default Menu
