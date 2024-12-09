import { z } from "zod"

export const LoginShema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string().min(3, { message: "Enter strong password" })
})