import * as z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
  username: z.string().min(3).max(30),
});

// export type SignUpSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});
