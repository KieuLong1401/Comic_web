import dynamic from 'next/dynamic'
import React from 'react'

const DisableSSR = dynamic(
    () =>
        Promise.resolve(({ children }: { children: React.ReactNode }) => {
            return <>{children}</>
        }),
    {
        ssr: false,
    }
)

export default DisableSSR
