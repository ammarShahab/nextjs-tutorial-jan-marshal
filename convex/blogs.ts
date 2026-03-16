import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createBlog = mutation({
  args: { title: v.string(), description: v.string() },

  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    console.log("Convex task.ts", user);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const blogArticle = await ctx.db.insert("blogs", {
      title: args.title,
      description: args.description,
      authorId: user._id,
    });
    return blogArticle;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    // Get all blogs from the database
    const blogs = await ctx.db.query("blogs").collect();

    // Order blogs by _creationTime (descending) to show latest first
    return blogs.sort((a, b) => b._creationTime - a._creationTime);
  },
});
