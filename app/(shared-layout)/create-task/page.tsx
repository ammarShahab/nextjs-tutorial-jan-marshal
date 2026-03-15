import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function CreateTask() {
  return (
    <div>
      <div className="space-y-2 text-center mt-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Task</h1>
        <p className="text-xl text-muted-foreground">Create Your Task</p>
      </div>
      <Card className="w-full max-w-xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
