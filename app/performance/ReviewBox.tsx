import { UserIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";

interface ReviewBoxProps {
    username: string;
    rating: number;
    review: string;
    feedback: string;
}

export default function ReviewBox({ username, rating, review, feedback }: ReviewBoxProps) {

    return (
        <div
            className="w-full group relative flex rounded-lg bg-white/5 py-4 px-5 text-white shadow-md"
        >
            <div className="flex flex-col space-y-2">
                <div className="flex items-center place-content-between">
                    <div className="inline-flex items-center space-x-1">
                        <UserIcon className="w-5 h-5 text-white" />
                        <p className="font-semibold text-white">{username}</p>
                    </div>
                    <div className="text-yellow-600 flex flex-row space-x-1">
                        {
                            Array.from({ length: rating }).map((_, i) => (
                                <StarIcon key={i} className="w-5 h-5" />
                            ))
                        }
                    </div>
                </div>
                <p className="text-white text-sm/6">
                    {review}
                </p>
                <hr className="border border-gray-700" />
                <div className="">
                    Feedback:
                </div>
                <div className="text-white text-sm/6">
                    {feedback}
                </div>
                <div className="flex items-center place-content-end">
                    <Button>Edit Feedback</Button>
                </div>
            </div>
        </div>
    );
}
