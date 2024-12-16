import UserDBClient from "@/app/lib/db/user"
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
    const { username, password, role } = await request.json()

    const user_client = new UserDBClient();
    await user_client.attach();

    const existing_user = await user_client.read(username);

    if (existing_user) {
        await user_client.detach();
        const password_match = bcrypt.compare(password, existing_user.password);

        if (!password_match) {
            return new Response(JSON.stringify({
                message: 'User not found or password is incorrect',
                status: 404,
            }), { status: 404 });
        }

        return Response.json({ message: 'User login successfully', role: existing_user.role, status: 200 })
    }

    return new Response(JSON.stringify({
        message: 'User not found or password is incorrect',
        status: 404,
    }), { status: 404 });
} 