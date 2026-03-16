import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
