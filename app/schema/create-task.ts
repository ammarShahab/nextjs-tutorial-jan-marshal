import z from "zod";

// 1.2 create zod schema in frontend
export const taskSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(1000),
});
