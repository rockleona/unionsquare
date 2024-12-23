// import { cookies } from 'next/headers';
import process from 'process';
import { decrypt } from '@/app/lib/session';
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'

export async function create(state: FormState, formData: FormData) {
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
        return {
            message: 'User created successfully'
        }
    } else {
        return {
            errors: {
                username: ['An error occurred while creating the user. Please try again.'],
            },
        }
    }
};

export async function update(state: FormState, formData: FormData){
    // TODO: Implement update user
}

export async function remove(state: FormState, username: string){
    // TODO: Implement remove user
    // const cookieStore = await cookies();
    // const session = cookieStore.get('session');

    const response = await fetch(`${process.env.API_URL}/api/user/${username}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${session}`,
        },
    });

    console.log(await response.json());


}