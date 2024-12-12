import UserDBClient from "@/app/lib/db/user"

export async function POST(request: Request) {
    const { username, password, role } = await request.json()

    const user_client = new UserDBClient();
    await user_client.connect();

    try {
        await user_client.create({
            username: username,
            password: password,
            role: role,
            reviews: []
        });
    } catch (error) {
        console.error('Error creating user:', error);
        await user_client.disconnect();
        return Response.json({ message: 'Error creating user', status: 500 })
    }
    
    await user_client.disconnect();
    return Response.json({ message: 'User created successfully', status: 200 })
} 