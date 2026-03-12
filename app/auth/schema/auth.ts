import * as z from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
  username: z.string().min(3).max(30),
});

export default signupSchema;

// export type SignUpSchema = z.infer<typeof signupSchema>;
