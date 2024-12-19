import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import ReviewBox from "@/app/performance/ReviewBox";
import ReviewReceiveBox from "@/app/performance/ReviewReceiveBox";
import { Suspense } from 'react';
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';

import UserDBClient from '@/app/lib/db/user';

export default async function Performance() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    const session_data = await decrypt(session?.value);

    const userDBClient = new UserDBClient();
    await userDBClient.attach();

    const all_users = await userDBClient.readAll();
    const all_user_reviews = all_users
        .map((user) => user._doc.reviews.map((review) => ({ ...review, username: user._doc.username })))
        .flat()

    const assigned = all_user_reviews.filter((user) => user._doc.reviewer === session_data.username);
    const from_others = all_user_reviews.filter((user) => user.username === session_data.username);

    await userDBClient.detach();

    const review_list = [
        {
            tab: "Review Your Team",
            reviews: assigned
        },
        {
            tab: "Review by Others",
            reviews: from_others
        }
    ]

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold">Performance Review</div>
            </div>
            <div className="w-1/2 mx-auto mt-5">
                <Suspense fallback={<div>Loading...</div>} >
                    <TabGroup>
                        <TabList className="flex gap-4">
                            {review_list.map(({ tab }) => (
                                <Tab
                                    key={tab}
                                    className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {tab}
                                </Tab>
                            ))}
                        </TabList>
                        <TabPanels className="mt-3">
                            {review_list.map(({ tab, reviews }) => (
                                <TabPanel key={tab} className="rounded-xl bg-white/5 p-3 flex flex-col space-y-3">
                                    {
                                        (tab === "Review Your Team") ?
                                            reviews?.map((review) => {
                                                return (
                                                    <ReviewBox key={'assigned-'+review.username} {...review} />
                                                )
                                            })
                                            :
                                            reviews?.map((review) => {
                                                return (
                                                    <ReviewReceiveBox key={'received-'+review._doc.reviewer} {...review} />
                                                )
                                            })
                                    }
                                </TabPanel>
                            ))}
                        </TabPanels>
                    </TabGroup>
                </Suspense>
            </div>
        </div>
    );
}
