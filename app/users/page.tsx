import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import UserDBClient from "@/app/lib/db/user";
import UserBox from '@/app/users/UserBox';
import UserAddBox from '@/app/users/UserAddBox';

import { Suspense } from 'react';

export default async function Users() {

    const userDBClient = new UserDBClient();
    await userDBClient.attach();
    
    const users = (await userDBClient.readAll()).map(user => user._doc);

    const user_list = [
        {
            tab: "Employees",
            users: users.filter(user => user.role === "employee")
        },
        {
            tab: "Admins",
            users: users.filter(user => user.role === "admin")
        }
    ]

    const all_users = users.map(user => user.username);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold">User Management</div>
            </div>
            <div className="w-1/2 mx-auto mt-5">
                <Suspense fallback={<div>Loading...</div>} >
                    <TabGroup>
                        <TabList className="flex gap-4">
                            {user_list.map(({ tab }) => (
                                <Tab
                                    key={tab}
                                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                            {user_list.map(({ tab, users }) => (
                                <TabPanel key={tab} className="rounded-xl bg-white/5 p-3 flex flex-col space-y-3">
                                    {users.map((user) => 
                                    {
                                        const dataset = {all_users, ...user};
                                        return (
                                            <UserBox key={user.username}  {...dataset} />
                                        )
                                    }
                                    )}
                                    <hr className='my-1'/>
                                    <UserAddBox />
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </Suspense>
            </div>
        </div>
    );
}
