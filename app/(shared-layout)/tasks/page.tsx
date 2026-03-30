import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { BadgeCheck } from "lucide-react";
import { Suspense } from "react";

// Helper — turn a Convex timestamp into a readable date
function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 5.0 as the task route is dynamic because its a shared layout with using token, so to make it static we will use force-static and in build mode. Note: to make any dynamic server component static (cached) we will use force-static. now after build when create any task it will show the stale data.
export const dynamic = "force-static";
// 6.0 to revalidate the data there are two types of revalidation i. time based revalidation ii. on demand revalidation. Note: it is also called ISR (Incremental Static Regeneration).
// 6.1 time based revalidation in every 30 seconds i.e. after 30 seconds the data will be updated
export const revalidate = 120;

export default function Tasks() {
  // created a fake delay of 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  //2.0 to make any server components remain server components we will use fetchQuery using react feature streaming (i.e in tasks page the client component Navbar and static component in the server component do not render only dynamic data will render with Skeleton Loading). But realtime updates will not be possible using fetchQuery for its limitations. to make server components realtime we will use preloadQuery which we will learn later.
  // const tasks = await fetchQuery(api.tasks.getTasks);
  // console.log("Tasks", tasks);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>

        {/* <Badge variant="outline">{tasks.length} total</Badge> */}
      </div>
      {/* 2.3 Call the component using suspense for implement streaming i.e. only the dynamic data will render with loading */}
      <Suspense fallback={<SkeletonLoading />}>
        <TasksLists />
      </Suspense>
    </div>
  );
}

export async function TasksLists() {
  // 2.1 fetch query in a server component and make it separate because we only want to stream the dynamic data

  await new Promise((resolve) => setTimeout(resolve, 5000));
  const tasks = await fetchQuery(api.tasks.getTasks);

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
    <>
      <div>
        <Badge variant="secondary">
          <BadgeCheck data-icon="inline-start" />
          {tasks.length} total
        </Badge>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
    </>
  );
}

// 2.2 Created a Skeleton loading
export function SkeletonLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl border p-4">
          {/* Image */}
          <Skeleton className="w-full h-40 rounded-lg" />

          {/* Title */}
          <Skeleton className="h-5 w-3/4 rounded-md" />

          {/* Content */}
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/6 rounded-md" />
        </div>
      ))}
    </div>
  );
}
