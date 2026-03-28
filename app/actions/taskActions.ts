"use server";

import z from "zod";
import { taskSchema } from "../schema/create-task";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";

// 1.4 create task actions in frontend
export default async function taskActions(data: z.infer<typeof taskSchema>) {
  const parsed = taskSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const token = await getToken();
  // fetchMutation is used to perform server action otherwise we will use mutation
  await fetchMutation(
    api.tasks.createTask,
    {
      title: parsed.data.title,
      content: parsed.data.content,
    },
    { token },
  );
  return redirect("/tasks");
}
