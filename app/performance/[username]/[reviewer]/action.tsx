// import { cookies } from 'next/headers';
import process from 'process';
import { decrypt } from '@/app/lib/session';
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'


export async function update_review_content(state: FormState, username:string, review: object) {
    // TODO: Implement update user

    console.log('update_reviewer action:', state, username, review);

    const response = await fetch(`${process.env.API_URL}/api/user/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${session}`,
        },
        body: JSON.stringify({
            operation: 'update_review',
            review: review
        })
    });
}