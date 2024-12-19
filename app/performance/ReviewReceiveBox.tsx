import { UserIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon, CheckCircleIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@headlessui/react";

interface ReviewBoxProps {
    reviewer: string;
    rating: number;
    review: string;
    feedback: string;
}

export default function ReviewReceiveBox(props: { _doc: ReviewBoxProps, username: string }) {
    const { reviewer, rating, review, feedback } = props._doc;
    const { username } = props;

    return (
        <div
            className="w-full group relative flex rounded-lg bg-white/5 py-4 px-5 text-white shadow-md"
        >
            <div className="w-full grid grid-cols-4 justify-items-start items-center">
                <div className="flex items-center space-x-1">
                    <UserIcon className="w-5 h-5 text-white" />
                    <div className="flex flex-col items-start">
                        <p className="text-xs">Review from:</p>
                        <p className="font-semibold text-white">{reviewer}</p>
                    </div>
                </div>
                {review.length > 0 ? (
                    <p className="font-semibold text-sm inline-flex text-green-500">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        Review Received
                    </p>
                ) : (
                    <p className="font-semibold text-sm inline-flex text-red-500">
                        <ExclamationCircleIcon className="w-5 h-5 " />
                        Not Review
                    </p>
                )}
                {feedback.length > 0 ? (
                    <p className="font-semibold text-sm inline-flex text-green-500">
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                        Feedback Sent
                    </p>
                ) : (
                    <p className="font-semibold text-sm inline-flex text-red-500">
                        <ExclamationCircleIcon className="w-5 h-5 " />
                        No Feedback
                    </p>
                )}
                <div>
                    <Button className="
                        inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white
                    " as="a" href={`/performance/${username}/${reviewer}`}>
                        <EyeIcon className="w-5 h-5 text-white" />
                        See Review
                    </Button>
                </div>
            </div>
        </div>
    );
}
