import z from "zod";

export const blogSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(10),
});
