// import { cookies } from 'next/headers';
import process from 'process';
import { decrypt } from '@/app/lib/session';
import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs'


export async function update_reviewer(state: FormState, username:string, reviewers: string[]) {
    // TODO: Implement update user

    console.log('update_reviewer action:', state, username, reviewers);

    const response = await fetch(`${process.env.API_URL}/api/user/${username}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${session}`,
        },
        body: JSON.stringify({
            operation: 'edit_reviewer',
            reviewers: reviewers
        })
    });
}