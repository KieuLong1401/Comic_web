'use client'

import Image from 'next/image'
import { useCallback } from 'react'

export default ({
    imageList,
}: {
    imageList: { id: number; image_src: string; image_order: number }[]
}) => {
    const imageErrHandler = useCallback((e) => {
        e.currentTarget.style.display = 'none'
    }, [])

    return (
        <>
            {imageList.map((e, i) => {
                return (
                    <Image
                        src={e.image_src}
                        alt=''
                        width={995}
                        height={2239}
                        style={{
                            display: 'block',
                            position: 'unset',
                            width: '100%',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        onError={imageErrHandler}
                        key={i}
                    />
                )
            })}
        </>
    )
}
