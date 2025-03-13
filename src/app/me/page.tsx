import { cookies } from 'next/headers';
import envConfig from '@/config';
import Profile from './profile';

export default async function MyProfile() {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get('sessionToken');
    console.log(sessionToken);
    if (!sessionToken?.value) {
        console.error("Không tìm thấy sessionToken trong cookie.");
        return <div>Không tìm thấy sessionToken</div>;
    }

    console.log("Session Token:", sessionToken.value);
    const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_URL}/account/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken?.value}`,
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
    console.log(result);
  return (
    <div>
      Hello {result.payload.data.name}
      <Profile />
    </div>
  )
}
