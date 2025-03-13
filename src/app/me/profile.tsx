'use client'

import envConfig from '@/config';
import { useEffect } from "react"
import { useAppContext } from "../AppProvider";

export default function Profile() {
    const {sessionToken} = useAppContext();
    useEffect(() => {
        const fetchRequest = async () => {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/account/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`,
                },
            }).then(async (res) => {
                const payload = await res.json();
                const data = {
                    status: res.status,
                    payload: payload
                }

                if (!res.ok) {
                    throw data;
                }
                return data;
            });
            console.log('Profile',result);
        }
        fetchRequest();
    }, [sessionToken])
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}