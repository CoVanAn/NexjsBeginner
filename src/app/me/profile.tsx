'use client'

import { useEffect, useState } from "react"
import accountApiRequest from '@/apiRequests/account';
import { clientSessionToken } from '@/lib/http';

export default function Profile() {
    interface Profile {
        name?: string;
    }
    const [profile, setProfile] = useState<Profile>({});
    useEffect(() => {
        const fetchRequest = async () => {
            const result = await accountApiRequest.meClient();
            setProfile(result.payload.data);
        }
        fetchRequest();
    }, [clientSessionToken])
    return (
        <div>
            <h1>i'm {' '}{profile?.name}</h1>
        </div>
    )
}