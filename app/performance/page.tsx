import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import ReviewBox from "@/app/performance/ReviewBox";

export default function Performance() {
    const review_list = [
        {
            tab: "Your Reviews",
            reviews: [
                {
                    username: "rkln",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                },
                {
                    username: "asa",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                },
                {
                    username: "crystal",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                }
            ]
        },
        {
            tab: "Reviews Given",
            reviews: [
                {
                    username: "aaron",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                },
                {
                    username: "sarah",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                },
                {
                    username: "taylor",
                    rating: 5,
                    review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus",
                    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper, nunc eget lacinia aliquet, metus"
                }
            ]
        }
    ]

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold">Performance Review</div>
            </div>
            <div className="w-1/2 mx-auto mt-5">
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
                                {reviews.map((review) => (
                                    <ReviewBox key={review.username} {...review} />
                                ))}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}
