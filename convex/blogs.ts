import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createBlog = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    // 3.3 Add the imageStorageId to the schema
    imageStorageId: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    console.log("Convex task.ts", user);

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const blogArticle = await ctx.db.insert("blogs", {
      title: args.title,
      description: args.description,
      authorId: user._id,
      // 3.4 Add the imageStorageId
      imageId: args.imageStorageId,
    });

    console.log("blog article", blogArticle);

    return blogArticle;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    // Get all blogs from the database
    const blogs = await ctx.db.query("blogs").order("desc").collect();

    // 3.6.5 return the resolvedImageUrl to the client as per documentation "https://docs.convex.dev/file-storage/serve-files"
    return Promise.all(
      blogs.map(async (blog) => {
        const resolvedImageUrl =
          blog.imageId !== undefined
            ? await ctx.storage.getUrl(blog.imageId)
            : null;
        return {
          ...blog,
          imageId: resolvedImageUrl,
        };
      }),
    );

    // Order blogs by _creationTime (descending) to show latest first
    // return blogs;
  },
});

// 3.2 Create a mutation to generate an upload URL according to the convex documentation
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

// 7.1 Create query for individual blog

export const getBlogById = query({
  args: { blogId: v.id("blogs") },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);
    // return blog;
    if (!blog) {
      return null;
    }
    // 7.2 also extract the imageStorageId
    const resolvedImageUrl =
      blog?.imageId !== undefined
        ? await ctx.storage.getUrl(blog.imageId)
        : null;
    return {
      ...blog,
      imageUrl: resolvedImageUrl,
    };
  },
});
