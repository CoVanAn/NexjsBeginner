'use client'
import { clientSessionToken } from '@/lib/http';
import { useState, useLayoutEffect } from 'react';

export default function AppProvider({
    children,
    initialSessionToken = ''
}: {
    children: React.ReactNode,
    initialSessionToken?: string
}) {
    // useLayoutEffect(() => {
    //     sessionToken.value = initialSessionToken
    // }, [initialSessionToken]);
    useState(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = initialSessionToken
        }
    }
    )
    return (
        <>
            {children}
        </>
    )
};