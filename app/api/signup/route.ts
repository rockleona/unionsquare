import UserDBClient from "@/app/lib/db/user"

export async function POST(request: Request) {
    const { username, password, role } = await request.json()

    const user_client = new UserDBClient();
    await user_client.attach();

    const existing_user = await user_client.read(username);
    if (existing_user) {
        await user_client.detach();
        return new Response(JSON.stringify({
            message: 'User already exists', status: 400
        }), { status: 400 });
    }

    await user_client.create({
        username: username,
        password: password,
        role: role,
        reviews: []
    });

    await user_client.detach();
    return new Response(JSON.stringify({ message: 'User created successfully', status: 200 }), { status: 200 })
} 