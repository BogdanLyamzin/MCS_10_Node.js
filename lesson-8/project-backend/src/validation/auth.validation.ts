import {z} from "zod";

export const registerSchema = z.strictObject({
    username: z.string().trim().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    password: z.string().min(8)
});

export const loginSchema = registerSchema.pick({
    username: true,
    password: true,
})