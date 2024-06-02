'use client'
import { usePathname } from 'next/navigation'
import styles from './Tooltip.module.css'

import React, {
    ReactNode,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react'

interface TooltipProps {
    children: ReactNode
    triggerElementId: string
    className?: string
    delay?: [number, number]
    visible?: boolean
    trigger: 'click' | 'mouseenter'
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    triggerElementId,
    className,
    delay = [0, 0],
    visible,
    trigger,
}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const path = usePathname()
    const showTimeout = useRef<number | undefined>(undefined)
    const hideTimeout = useRef<number | undefined>(undefined)

    function setIsShowWithDelay(show: boolean) {
        if (show) {
            showTimeout.current = window.setTimeout(() => {
                setIsShow(true)
            }, delay[0])
            if (hideTimeout.current !== undefined)
                window.clearTimeout(hideTimeout.current)
        } else {
            hideTimeout.current = window.setTimeout(() => {
                setIsShow(show)
            }, delay[1])
            if (showTimeout.current !== undefined)
                window.clearTimeout(showTimeout.current)
        }
    }

    const handleClick = useCallback(() => {
        setIsShowWithDelay(!isShow)
    }, [setIsShowWithDelay])

    const handleClickOutside = useCallback(
        (e) => {
            if (!isShow) return
            const clickPosition = e.target as Element

            if (
                clickPosition.closest(`.${styles.container}`) ||
                clickPosition.closest(`#${triggerElementId}`)
            )
                return
            setIsShowWithDelay(false)
        },
        [setIsShowWithDelay, isShow, triggerElementId]
    )

    const handleMouseenter = useCallback(() => {
        setIsShowWithDelay(true)
    }, [setIsShowWithDelay])

    const handleMouseLeave = useCallback(() => {
        setIsShowWithDelay(false)
    }, [setIsShowWithDelay])

    useEffect(() => {
        setIsShow(false)
    }, [path])

    useEffect(() => {
        const triggerElement = document.getElementById(triggerElementId)
        const tooltipElement = document.getElementsByClassName(
            styles.container
        )[0] as HTMLElement

        if (trigger === 'click') {
            triggerElement?.addEventListener('click', handleClick)
            window.addEventListener('click', handleClickOutside)
        } else if (trigger === 'mouseenter') {
            triggerElement?.addEventListener('mouseenter', handleMouseenter)
            triggerElement?.addEventListener('mouseleave', handleMouseLeave)
            tooltipElement?.addEventListener('mouseenter', handleMouseenter)
            tooltipElement?.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            triggerElement?.removeEventListener('click', handleClick)
            triggerElement?.removeEventListener('mouseenter', handleMouseenter)
            triggerElement?.removeEventListener('mouseleave', handleMouseLeave)
            tooltipElement?.removeEventListener('mouseenter', handleMouseenter)
            tooltipElement?.removeEventListener('mouseleave', handleMouseLeave)
            window.clearTimeout(showTimeout.current)
            window.clearTimeout(hideTimeout.current)
        }
    }, [setIsShowWithDelay, trigger, triggerElementId])

    return (
        isShow && (
            <div className={`${styles.container} ${className && className}`}>
                {children}
            </div>
        )
    )
}

export default Tooltip
