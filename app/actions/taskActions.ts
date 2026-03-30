"use server";

import z from "zod";
import { taskSchema } from "../schema/create-task";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

// 4.0 as in build mode when Unauthorized  the ui not showing the Unauthorized message. Following we use the Unauthorized error to show the message
// 4.1 create typwe for error message
type ActionMessage = { success: true } | { success: false; error: string };

// 1.4 create task actions in frontend
export default async function taskActions(
  data: z.infer<typeof taskSchema>,
  // 4.2 return the Procmise of ActionMessage
): Promise<ActionMessage> {
  const parsed = taskSchema.safeParse(data);

  /*  if (!parsed.success) {
    throw new Error(parsed.error.message);
  } */

  // 4.3
  if (!parsed.success) {
    return { success: false, error: parsed.error.message };
  }

  const token = await getToken();
  // 4.4 use try catch
  try {
    await fetchMutation(
      api.tasks.createTask,
      {
        title: parsed.data.title,
        content: parsed.data.content,
      },
      { token },
    );
    // 6.2 on demand revalidation are two types i. revalidatePath ii. revalidateTag. Note: as we use revalidatePath so time based revalidation will not work now. It will work only in server environment and route handlers. Not work in client component and proxy.
    revalidatePath("/tasks");
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
  // fetchMutation is used to perform server action otherwise we will use mutation
  return redirect("/tasks");
}
