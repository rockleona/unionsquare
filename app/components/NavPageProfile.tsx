import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session';

import NavPageLogout from '@/app/components/NavPageLogout';
import dynamic from 'next/dynamic'

export default async function NavPageProfile() {
    const cookiesStore = await cookies();
    const session = cookiesStore.get('session')
    const user = await decrypt(session?.value)

    return (
        session && user &&
        (<div className='flex flex-row items-center space-x-2'>
            <div className="flex flex-col items-start place-content-start">
                <h3 className="text-sm text-white">{user?.username as string}</h3>
                <p className="text-xs text-gray-400">{user?.role as string}</p>
            </div>
            <NavPageLogout />
        </div>)
    );
}
