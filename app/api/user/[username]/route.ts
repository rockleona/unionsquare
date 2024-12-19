import UserDBClient from "@/app/lib/db/user"

export async function PUT(request: Request, { params }: { params: Promise<{ username: string }> }) {
    const username = (await params).username;
    const body = await request.json();

    const user_client = new UserDBClient();
    await user_client.attach();

    const existing_user = await user_client.read(username);

    if (!existing_user) {
        await user_client.detach();
        return new Response(JSON.stringify({
            message: 'User not exists', status: 400
        }), { status: 400 });
    }

    if (body.operation === 'edit_reviewer') {
        if (!body.reviewers) {
            await user_client.detach();
            return new Response(JSON.stringify({
                message: 'Reviewer not provided', status: 400
            }), { status: 400 });
        }

        let excluded_reviewers: string[] = existing_user.reviews.filter((review) => {
            return !body.reviewers.includes(review.reviewer);
        }
        ).map((review) => review.reviewer);

        excluded_reviewers.forEach((reviewer: string) => {
            existing_user.reviews = existing_user.reviews.filter((review) => review.reviewer !== reviewer);
        }
        );

        let not_existing_reviewers: string[] = body.reviewers.filter((reviewer: string) => {
            return !existing_user.reviews.find((review) => review.reviewer === reviewer);
        });

        not_existing_reviewers.forEach((reviewer: string) => {
            existing_user.reviews.push({
                review: "",
                reviewer: reviewer,
                rating: 0,
                feedback: ""
            });
        }
        );
    }
    else if (body.operation === 'update_review') {
        if (!body.review) {
            await user_client.detach();
            return new Response(JSON.stringify({
                message: 'Review not provided', status: 400
            }), { status: 400 });
        }

        existing_user.reviews = existing_user.reviews.map((review) => {
            if (review.reviewer === body.review.reviewer) {
                return {
                    ...review,
                    review: body.review?.review,
                    rating: body.review?.rating,
                    feedback: body.review?.feedback
                }
            }
            return review;
        });

        console.log(existing_user.reviews);
    }

    await user_client.update(username, existing_user);
    await user_client.detach();

    return new Response(JSON.stringify({ message: 'User updated successfully', status: 200 }), { status: 200 })
}

export async function DELETE(request: Request, { params }: { params: Promise<{ username: string }> }) {
    const username = (await params).username;
    console.log(username);

    const user_client = new UserDBClient();
    await user_client.attach();

    const existing_user = await user_client.read(username);

    if (!existing_user) {
        await user_client.detach();
        return new Response(JSON.stringify({
            message: 'User not exists', status: 400
        }), { status: 400 });
    }


    await user_client.delete(username);
    await user_client.detach();

    return new Response(JSON.stringify({ message: 'User deleted successfully', status: 200 }), { status: 200 })
} 