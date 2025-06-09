import { z } from "zod/v4"; 

export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string().optional()
  
})

export const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})
