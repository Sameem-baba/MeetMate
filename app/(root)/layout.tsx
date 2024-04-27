import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import { Stream } from 'stream'

function Root({ children }: { children: ReactNode }) {
    return (
        <main>
            <StreamVideoProvider>{children}</StreamVideoProvider>

        </main>
    )
}

export default Root