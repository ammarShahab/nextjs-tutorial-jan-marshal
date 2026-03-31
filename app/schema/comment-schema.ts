import z from "zod";
// 8.3 created a comment schema in frontend
export const commentSchema = z.object({
  content: z
    .string()
    .min(3, "Comments must be al least 3 characters")
    .max(500, "Comments must be under 500 characters"),
});
