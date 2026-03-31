"use client";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { commentSchema } from "@/app/schema/comment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// 8.4 create a CommentSection
export default function CommentSection() {
  // 8.5 get the blogId using useParams. Note: useParams is used to get the id in the client side. so we can avoid props drilling also.
  const params = useParams<{ blogId: Id<"blogs"> }>();
  const createComment = useMutation(api.comments.createComments);

  // 9.0 as we want to instant update the comments, we need to use useQuery to fetch the comments.
  const comment = useQuery(api.comments.getCommentByBlogId, {
    blogId: params.blogId,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      blogId: params.blogId,
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      await createComment({ blogId: params.blogId, content: data.content });
      toast.success("Comment created successfully");
      reset();
    } catch (error) {
      toast.error("Failed to create comment");
    }
  };
  return (
    <Card className="space-y-4 mt-4">
      {/* <h1>Comments</h1> */}
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          Write a comment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Textarea
            // name="comment"
            className="w-full"
            placeholder="Write your comments"
            {...register("content")}
          />
          {errors.content && <p>{errors.content.message}</p>}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className=" animate-spin" /> Commenting...
              </>
            ) : (
              "Comment"
            )}
          </Button>
        </form>
      </CardContent>
      {JSON.stringify(comment)}
    </Card>
  );
}
