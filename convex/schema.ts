import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    title: v.string(),
    description: v.string(),
    authorId: v.string(),
  }),

  // 1.0 Create schema for create task functionality
  tasks: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
  }),
});
