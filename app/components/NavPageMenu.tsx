import NextLink from "next/link";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session';

export default async function NavPageMenu() {
    const cookiesStore = await cookies();
    const session = cookiesStore.get('session')
    const user = await decrypt(session?.value)

    return (
        session && user &&
        (<Popover className="relative">
            <PopoverButton className="text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">Menu</PopoverButton>
            <PopoverPanel
                transition
                anchor="bottom start"
                className="mt-3 flex flex-col space-y-3 text-start  rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
                <NextLink className="px-4 py-2" href="/">Dashboard</NextLink>
                <NextLink className="px-4 py-2" href="/performance">Performance Review</NextLink>
                {user?.role == 'employer' ? (<NextLink className="px-4 py-2" href="/employees">Employees</NextLink>) : <></>}
            </PopoverPanel>
        </Popover>)
    );
}
