import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const ReviewFormSchema = z.object({
  review: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
})
 

export type ReviewState =
  | {
      errors?: {
        review?: string[]
        rating?: number[]
      }
      message?: string
    }
  | undefined

  export type SessionPayload = {
    username: string
    role: 'employee' | 'admin'
    expiresAt: Date
  }