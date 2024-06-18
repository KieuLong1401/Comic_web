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
                        width={1000}
                        height={700}
                        sizes='100vw'
                        style={{
                            width: '100%',
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
