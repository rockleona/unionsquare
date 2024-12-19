import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { createSession, destroySession } from '@/app/lib/session'
import { redirect } from 'next/navigation'
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

export async function login(state: FormState, formData: FormData) {
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

    // Log the user in

    const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
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
                username: [],
                password: ['Password or username might be wrong. Please try again.'],
            },
        }
    }

    if (data.status === 200) {
        await createSession(username, data.role);
        redirect('/performance')
    } else {
        return {
            errors: {
                username: ['An error occurred while logging in. Please try again.'],
            },
        }
    }
}

export async function logout() {
    destroySession();
    redirect('/login');
}