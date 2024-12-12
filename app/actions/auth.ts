import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
import UserDBClient from '@/app/lib/db/user'

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { username, password } = validatedFields.data

    // Create a new user

    fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            role: formData.get('role'),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(async (response) => {
            const data = await response.json()

            if (data.status === 200) {
                redirect('/login')
            } else {
                return {
                    message: data.message,
                }
            }
        })
        .catch((error) => {
            console.error('Error creating user:', error)
        })
};