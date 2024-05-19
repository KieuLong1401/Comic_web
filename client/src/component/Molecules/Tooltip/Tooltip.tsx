'use client'
import { usePathname } from 'next/navigation'
import styles from './Tooltip.module.css'

import React, { ReactNode, useState, useEffect, useRef } from 'react'

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

    useEffect(() => {
        setIsShow(false)
    }, [path])

    useEffect(() => {
        const triggerElement = document.getElementById(triggerElementId)
        const tooltipElement = document.getElementsByClassName(
            styles.container
        )[0] as HTMLElement

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
        function handleClick() {
            setIsShowWithDelay(!isShow)
        }
        function handleClickOutside(e) {
            if (!isShow) return
            const clickPosition = e.target as Element

            if (
                clickPosition.closest(`.${styles.container}`) ||
                clickPosition.closest(`#${triggerElementId}`)
            )
                return
            setIsShowWithDelay(false)
        }
        function handleMouseenter() {
            setIsShowWithDelay(true)
        }
        function handleMouseLeave() {
            setIsShowWithDelay(false)
        }

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
    }, [delay, isShow, trigger, triggerElementId])

    return (
        isShow && (
            <div className={`${styles.container} ${className && className}`}>
                {children}
            </div>
        )
    )
}

export default Tooltip
