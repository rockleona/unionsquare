import UserDBClient from "@/app/lib/db/user"

export async function POST(request: Request) {
    const formData = await request.formData()

    const username = formData.get('username')
    const password = formData.get('password')
    const role = formData.get('role')

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
        throw error
    }

    return Response.json({ message: 'User created successfully', status: 200 })
} 