import UserDBClient from "@/app/lib/db/user"
import Form from "next/form";
import { Button } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { redirect } from "next/navigation";

import { update_reviewer } from "@/app/user/[username]/action";

export default async function Page({
    params,
}: {
    params: Promise<{ username: string }>
}) {
    const username = (await params).username

    const userDBClient = new UserDBClient();
    await userDBClient.attach();

    const user = await userDBClient.read(username);
    const user_data = user._doc;

    const current_reviewers = user_data.reviews.map((review) => review.reviewer);

    const all_users = await userDBClient.readAll();
    const all_users_username = all_users.map((user) => user.username);

    await userDBClient.detach();

    const handleUpdate = async (formData: FormData) => {
        'use server';

        console.log('formData:', formData.getAll('reviewers'));
        await update_reviewer(undefined, username, formData.getAll('reviewers') as string[]);

        redirect(`/users`);
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold">{username}</div>
            </div>
            <div className="w-1/2 mx-auto mt-5">
                <h2 className="text-semibold">Select Reviewers:</h2>
                <p className="text-sm">Hold "Ctrl / command" button to do multiselection.</p>
                <Form action={handleUpdate} className="w-full flex flex-col space-y-2 mt-5">
                    <select name="reviewers" defaultValue={current_reviewers} id="cars" className="h-96 bg-black border border-gray-400 flex flex-col space-y-3 text-white" multiple>
                        {all_users_username.map((user) => (
                            <option value={user} className="px-3 py-1 hover:bg-gray-600">{user}</option>
                        ))}
                    </select>
                    <Button type="submit" className='place-self-end inline-flex items-center hover:opacity-70 opacity-100 transition-opacity duration-200'>
                        <CheckCircleIcon className="w-5 h-5 text-white mr-1" />
                        Confirm Reviewers
                    </Button>
                </Form>
            </div>
        </div>
    )
}