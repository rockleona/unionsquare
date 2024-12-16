import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
import UserDBClient from '@/app/lib/db/user'
import bcrypt from 'bcryptjs'

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
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user

    const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: hashedPassword,
            role: formData.get('role'),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error('Failed to parse response JSON');
    }

    if (!response.ok) {
        return {
            errors: {
                username: ['An error occurred while creating the user. Please try again.'],
            },
        }
    }

    if (data.status === 200) {
        redirect('/login');
    } else {
        return {
            errors: {
                username: ['An error occurred while creating the user. Please try again.'],
            },
        }
    }
};