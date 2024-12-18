import { ReviewState } from "@/app/lib/definitions";

export async function createReview(state: ReviewState, formData: FormData) {

    const response = await fetch('/api/review', {
        method: 'POST',
        body: formData
    });
    
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to create review');
    }
    
}