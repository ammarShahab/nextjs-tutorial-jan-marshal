import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createTask = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const taskList = ctx.db.insert("tasks", {
      title: args.title,
      content: args.content,
      userId: user._id,
    });
    return taskList;
  },
});

export const getTasks = query({
  args: {},
  handler: (ctx) => {
    const tasks = ctx.db.query("tasks").collect();
    return tasks;
  },
});
