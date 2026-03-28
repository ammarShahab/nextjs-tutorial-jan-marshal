import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

// 1.1 Create a task api in convex
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

// 2.1
export const getTasks = query({
  args: {},
  handler: (ctx) => {
    const tasks = ctx.db.query("tasks").collect();
    return tasks;
  },
});
