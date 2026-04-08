import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import React from "react";

// 15.0 create skeleton loading page for blog
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button skeleton */}
      <div className="mb-1.5 mt-0.5 px-2 py-4 rounded-xl border flex gap-1.5 justify-center items-center w-1/4">
        {/* <ArrowLeft className="size-4 text-muted-foreground" /> */}
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Main content skeleton */}
      <div className="border-0 rounded-t-lg shadow-lg overflow-hidden">
        {/* Image skeleton */}
        <Skeleton className="w-full h-[300px]" />

        {/* Content skeleton */}
        <div className="my-5 px-1">
          {/* Title skeleton */}
          <Skeleton className="h-9 w-3/4 mb-2" />

          <Separator className="mt-2 mb-2" />

          {/* Description skeleton - multiple lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <Separator className="mt-2 mb-2" />

          {/* Date skeleton */}
          <Skeleton className="h-4 w-48 mt-4" />
        </div>
      </div>
    </div>
  );
}
