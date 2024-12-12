'use client'

import { Field, Fieldset, Input, Label, Legend, Select, Button, Description } from '@headlessui/react'
import clsx from 'clsx'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupPage() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <div className='absolute w-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <form action={action}>
                <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                    <Legend className="text-base/7 font-semibold text-white">Welcome to UnionSquare!</Legend>
                    <Legend className="text-base/10 font-light text-white">Fill out the form below:</Legend>
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
                        <Label htmlFor="role" className="text-sm/6 font-medium text-white">Role:</Label>
                        <Select id='role' name='role' required defaultValue={'employee'}
                            className={clsx(
                                'mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                // Make the text of each option black on Windows
                                '*:text-black'
                            )}
                        >
                            <option value='employee' >Employee</option>
                            <option value='employer' >Employer</option>
                        </Select>
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
                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" type="submit">Sign Up</Button>
                </Fieldset>
            </form>
        </div>
    );
};