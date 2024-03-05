'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

function Theme({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            defaultTheme={'dark'}
            storageKey='theme'
        >
            {children}
        </ThemeProvider>
    )
}

export default Theme
