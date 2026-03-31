import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

// 8.1 created a backend api for comments.ts and Get all comments for a specific blog using filter index
export const getCommentByBlogId = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_blog", (q) => q.eq("blogId", args.blogId))
      .order("desc")
      .collect();
  },
});

// 8.2 Post a comment

export const createComments = mutation({
  args: { blogId: v.id("blogs"), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.db.insert("comments", {
      blogId: args.blogId,
      content: args.content,
      userId: user._id,
      userName: user.name ?? "Anonymous",
    });
  },
});
