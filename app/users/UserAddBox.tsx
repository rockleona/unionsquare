'use client'

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Field, Input, Label, Select, Button, Description } from '@headlessui/react'

import Form from 'next/form'
import { useActionState } from "react";
import clsx from 'clsx';

import { create } from '@/app/users/action';

export default function UserAddBox() {
    const [state, action, pending] = useActionState(create);


    return (
        <div
            className="w-full group relative flex rounded-lg bg-white/5 py-4 px-5 text-white shadow-md"
        >
            <div className="flex flex-col space-y-2 w-full">
                <Form action={action}>
                    <div className="grid grid-cols-4 w-full justify-items-stretch gap-2">
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">Name</Label>
                            <Input name="username" className={clsx(
                                'block w-full rounded-lg border-none bg-white/5 py-1.5 px-1 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">Role</Label>
                            <Select id='role' name='role' required defaultValue={'employee'}
                                className={clsx(
                                    'block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-1 text-sm/6 text-white',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                    // Make the text of each option black on Windows
                                    '*:text-black'
                                )}
                            >
                                <option value='employee' >Employee</option>
                                <option value='admin' >Admin</option>
                            </Select>
                        </Field>
                        <Field>
                            <Label className="text-sm/6 font-medium text-white">Password</Label>
                            <Input name="password" type="password" className={clsx(
                                'block w-full rounded-lg border-none bg-white/5 py-1.5 px-1 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )} />
                        </Field>
                        <Button type="submit" className='place-self-end inline-flex items-center hover:opacity-70 opacity-100 transition-opacity duration-200'>
                            <PlusCircleIcon className="w-5 h-5 text-white mr-1" />
                            Add User
                        </Button>
                    </div>
                    <p>
                        {state?.errors?.username && <span className="text-sm/6 text-red-500">{state.errors?.username}</span>}
                        {state?.errors?.password && <span className="text-sm/6 text-red-500">{state.errors?.password}</span>}
                        {state?.message && <span className="text-sm/6 text-green-500">{state.message}</span>}
                    </p>
                </Form>
            </div>
        </div>
    );
}
