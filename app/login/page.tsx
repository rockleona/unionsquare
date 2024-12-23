'use client';

import { Field, Fieldset, Input, Label, Legend, Select, Button, Description } from '@headlessui/react'
import clsx from 'clsx'

import { login } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupPage() {
    const [state, action, pending] = useActionState(login, undefined)

    return (
        <div className='absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h2 className='text-2xl text-center mb-5 font-bold'>Welcome to UnionSquare!</h2>
            <form action={action}>
                <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                    <Legend className="text-base/10 font-light text-white">Sign up with the info below:</Legend>
                    <Field>
                        <Label htmlFor="username" className="text-sm/6 font-medium text-white">Username:</Label>
                        <Input
                            type="username"
                            id="username"
                            name="username"
                            placeholder='Username'
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            required
                        />
                        {state?.errors?.username && <Description className="text-sm/6 text-red-500">{state.errors.username}</Description>}
                    </Field>
                    <Field>
                        <Label htmlFor="password" className="text-sm/6 font-medium text-white">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            className={clsx(
                                'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            required
                        />
                        {state?.errors?.password && <Description className="text-sm/6 text-red-500">{state.errors.password}</Description>}
                    </Field>
                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" type="submit">Login</Button>
                    <Button className="rounded-md text-sm/6 font-semibold text-white data-[hover]:underline ml-5" as="a" href='/signup'>I don't have an account.</Button>
                </Fieldset>
            </form>
        </div>
    );
};