"use client";

import taskActions from "@/app/actions/taskActions";
import { taskSchema } from "@/app/schema/create-task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreateTask() {
  // 1.3 create task form in frontend
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
  });

  async function onSubmit(data: z.infer<typeof taskSchema>) {
    console.log("Task Created", data);
    await taskActions(data);
  }

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

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <Label>Title</Label>
              <Input placeholder="Title" {...register("title")}></Input>
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-3">
              <Label>Content</Label>
              <Input placeholder="Content" {...register("content")}></Input>
              {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
