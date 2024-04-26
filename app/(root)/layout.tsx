import React, { ReactNode } from 'react'

function Root({ children }: { children: ReactNode }) {
    return (
        <main>
            {children}
        </main>
    )
}

export default Root