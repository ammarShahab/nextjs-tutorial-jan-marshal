import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { BadgeCheck } from "lucide-react";

// Helper — turn a Convex timestamp into a readable date
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Tasks() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // to make any server components remain server components we will use fetchQuery. But realtime updates will not be possible using fetchQuery for its limitations. to make server components realtime we will use preloadQuery which will learn later.
  const tasks = await fetchQuery(api.tasks.getTasks);
  console.log("Tasks", tasks);

  if (tasks === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground text-sm">
          No tasks yet. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
        <Badge variant="secondary">
          <BadgeCheck data-icon="inline-start" />
          {tasks.length} total
        </Badge>
        {/* <Badge variant="outline">{tasks.length} total</Badge> */}
      </div>

      <div className="flex gap-4">
        {tasks.map((task) => (
          <Card key={task._id} className="border shadow-none flex-1">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base font-medium leading-snug">
                  {task.title}
                </CardTitle>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(task._creationTime)}
                </span>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {task.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
