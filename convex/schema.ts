import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    title: v.string(),
    description: v.string(),
    authorId: v.string(),
    // 3.0 Creating image upload features using convex
    // 3.1 define the schema for the image as an id type. As per convex doc the image storage is works with id
    imageId: v.optional(v.id("_storage")),
    // imageId: v.id("_storage"),
  }),

  // 1.0 Create schema for create task functionality
  tasks: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
  }),
});
