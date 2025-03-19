import { cookies } from 'next/headers';
import envConfig from '@/config';
import Profile from './profile';
import authApiRequest from '@/apiRequests/auth';
import accountApiRequest from '@/apiRequests/account';

export default async function MyProfile() {
    const cookieStore = cookies();
    const sessionToken = (await cookieStore).get('sessionToken');
    const result = await accountApiRequest.me(sessionToken?.value ?? "");
    console.log(result);
  return (
    <div>
      Hello {result.payload.data.name}
      <Profile />
    </div>
  )
}
