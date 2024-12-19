import { UserIcon, CheckBadgeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { remove } from '@/app/users/action';
import Form from "next/form";

interface UserBoxProps {
    username: string;
    reviews: {
        review: string;
        reviewer: string;
        rating: string;
        feedback: string | null;
    }[];
}

export default function UserBox({ username, reviews }: UserBoxProps) {
    if(reviews === undefined) reviews = [];
    const review_had_comments = reviews.filter(review => review.review.length > 0).length;
    const current_reviewer = reviews.find(review => review.reviewer !== undefined);

    const handleRemove = async (e: React.FormEvent<HTMLFormElement>) => {
        'use server';

        await remove(undefined, username);
        return;
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        'use server';

        // await update(undefined, username);
        return;
    }

    return (
        <div
            className="w-full group relative flex rounded-lg bg-white/5 py-4 px-5 text-white shadow-md"
        >
            <div className="flex flex-col space-y-2 w-full">
                <div className="grid grid-cols-3 w-full">
                    <div className="inline-flex items-center space-x-1">
                        <UserIcon className="w-5 h-5 text-white" />
                        <p className="font-semibold text-white">{username}</p>
                    </div>
                    <div className="inline-flex items-center space-x-1">
                        <CheckBadgeIcon className="w-5 h-5 text-white" />
                        <p className="text-white text-sm">
                            Review Progess:&nbsp;
                            <b className="font-semibold">{
                                reviews.length > 0 ? `${review_had_comments}/${reviews.length}` : "0/0"
                            }</b>
                        </p>
                    </div>
                    <div className="flex items-center place-content-end space-x-2">
                        <Button className="hover:opacity-70 opacity-100 transition-opacity duration-200" as="a" href={`/user/${username}`}>
                            <PencilIcon className="w-5 h-5 text-white" />
                        </Button>
                        <Form action={handleRemove} className="w-5 h-5">
                            <input type="hidden" name="username" value={username} />
                            <Button type="submit" className="hover:opacity-70 opacity-100 transition-opacity duration-200">
                                <TrashIcon className="w-full h-full text-white" />
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
