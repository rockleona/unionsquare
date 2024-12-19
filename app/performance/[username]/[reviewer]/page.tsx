import UserDBClient from "@/app/lib/db/user"
import Form from "next/form";
import { Button, Field, Label, Input, Radio, RadioGroup } from "@headlessui/react"
import { StarIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import clsx from "clsx";

import { update_review_content } from "@/app/performance/[username]/[reviewer]/action";

export default async function Page({
    params,
}: {
    params: Promise<{ username: string, reviewer: string }>
}) {
    const username = (await params).username
    const reviewer = (await params).reviewer;

    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const session_data = await decrypt(session?.value);


    const is_user = session_data.username === username;
    const is_reviewer = session_data.username === reviewer;
    if (!is_user && !is_reviewer) {
        return redirect('/performance');
    }

    const userDBClient = new UserDBClient();
    await userDBClient.attach();

    const user = await userDBClient.read(username);
    const user_data = user._doc;

    const review_content = user_data.reviews.find((review) => review.reviewer === reviewer);

    await userDBClient.detach();

    const handleUpdate = async (formData: FormData) => {
        'use server';

        if (is_reviewer && is_user) {
            await update_review_content(undefined, username, {
                reviewer: reviewer,
                review: formData.get('review') as string || review_content?.review,
                rating: parseInt(formData.get('rating') as string) || review_content?.rating,
                feedback: formData.get('feedback') as string || review_content?.feedback,
            });
        }

        else if (is_reviewer) {
            await update_review_content(undefined, username, {
                reviewer: reviewer,
                review: formData.get('review') as string,
                rating: parseInt(formData.get('rating') as string),
                feedback: review_content?.feedback,
            });
        } else if (is_user) {
            await update_review_content(undefined, username, {
                reviewer: reviewer,
                review: review_content?.review,
                rating: review_content?.rating,
                feedback: formData.get('feedback') as string,
            });
        }

        redirect(`/performance`);
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold">{username}</div>
            </div>
            <div className="w-1/2 mx-auto mt-5">
                {
                    is_reviewer ?
                        (
                            <Form action={handleUpdate} className="w-full flex flex-col space-y-2 mt-5">
                                <Field>
                                    <Label htmlFor="rating" className="text-sm/6 font-medium text-white">Rating:</Label>
                                    <RadioGroup name="rating" defaultValue={review_content?.rating} aria-label="rating" className="flex space-x-2 mt-3">
                                        <Radio
                                            value="1"
                                            className="group w-28 h-10 data-[checked]:bg-blue-800 data-[disabled]:bg-gray-800 "
                                        >
                                            <div className="w-28 h-10 items-center justify-center flex hover:bg-blue-800 transition-colors duration-200 rounded-2xl">
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                            </div>
                                        </Radio>
                                        <Radio
                                            value="2"
                                            className="group w-28 h-10 data-[checked]:bg-blue-800 data-[disabled]:bg-gray-800 "
                                        >
                                            <div className="w-28 h-10 items-center justify-center flex hover:bg-blue-800 transition-colors duration-200 rounded-2xl">
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                            </div>
                                        </Radio>
                                        <Radio
                                            value="3"
                                            className="group w-28 h-10 data-[checked]:bg-blue-800 data-[disabled]:bg-gray-800 "
                                        >
                                            <div className="w-28 h-10 items-center justify-center flex hover:bg-blue-800 transition-colors duration-200 rounded-2xl">
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                            </div>
                                        </Radio>
                                        <Radio
                                            value="4"
                                            className="group w-28 h-10 data-[checked]:bg-blue-800 data-[disabled]:bg-gray-800 "
                                        >
                                            <div className="w-28 h-10 items-center justify-center flex hover:bg-blue-800 transition-colors duration-200 rounded-2xl">
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                            </div>
                                        </Radio>
                                        <Radio
                                            value="5"
                                            className="group w-28 h-10 data-[checked]:bg-blue-800 data-[disabled]:bg-gray-800 "
                                        >
                                            <div className="w-28 h-10 items-center justify-center flex hover:bg-blue-800 transition-colors duration-200 rounded-2xl">
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                            </div>
                                        </Radio>
                                    </RadioGroup>
                                </Field>
                                <Field>
                                    <Label htmlFor="review" className="text-sm/6 font-medium text-white">Review:</Label>
                                    <Input
                                        type="text"
                                        id="review"
                                        name="review"
                                        placeholder='review'
                                        defaultValue={review_content?.review}
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        required
                                    />
                                </Field>
                                <Button type="submit" className='place-self-end inline-flex items-center hover:opacity-70 opacity-100 transition-opacity duration-200'>
                                    <CheckCircleIcon className="w-5 h-5 text-white mr-1" />
                                    Update Review
                                </Button>
                            </Form>
                        )
                        : (
                            <div>
                                <p className="text-sm">Review:</p>
                                <p className="text-lg font-semibold">{review_content?.review}</p>
                                <p className="text-sm">Rating:</p>
                                <p className="text-lg font-semibold flex space-x-1 text-yellow-500">
                                    {Array.from({ length: review_content?.rating }, (_, i) => i).map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5" />
                                    ))}
                                </p>
                            </div>
                        )
                }
                <hr className="text-gray-500 my-5" />
                {
                    is_user ?
                        (
                            <Form action={handleUpdate} className="w-full flex flex-col space-y-2 mt-5">
                                <Field>
                                    <Label htmlFor="feedback" className="text-sm/6 font-medium text-white">Feedback:</Label>
                                    <Input
                                        type="text"
                                        id="feedback"
                                        name="feedback"
                                        placeholder='feedback'
                                        defaultValue={review_content?.feedback}
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        required
                                    />
                                </Field>
                                <Button type="submit" className='place-self-end inline-flex items-center hover:opacity-70 opacity-100 transition-opacity duration-200'>
                                    <CheckCircleIcon className="w-5 h-5 text-white mr-1" />
                                    Update Feedback
                                </Button>
                            </Form>
                        )
                        :
                        (
                            <div>
                                <p className="text-sm">Feedback:</p>
                                <p className="text-lg font-semibold">{review_content?.feedback}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}