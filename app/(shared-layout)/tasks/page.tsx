import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Tasks() {
  // to make any server components remain server components we will use fetchQuery. But realtime updates will not be possible using fetchQuery for its limitations. to make server components realtime we will use preloadQuery
  const tasks = await fetchQuery(api.tasks.getTasks);
  console.log("Tasks", tasks);

  return <div>Task </div>;
}
