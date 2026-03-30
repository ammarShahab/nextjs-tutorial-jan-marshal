"use client";

import { blogSchema } from "@/app/schema/create-blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function CreateBlog() {
  const mutation = useMutation(api.blogs.createBlog);

  // 3.5 call the generateImageUploadUrl
  const generateImageUploadUrl = useMutation(api.blogs.generateImageUploadUrl);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof blogSchema>) {
    startTransition(async () => {
      // 3.6 created an image id
      let imageStorageId;

      // 3.6.1 check the image is present or not
      if (values.image) {
        const file = values.image;
        // 3.6.2 if image is present then call the generateImageUploadUrl
        const imageUploadUrl = await generateImageUploadUrl();
        // 3.6.3 send the image to the imageUploadUrl
        const result = await fetch(imageUploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
        const { storageId } = await result.json();
        imageStorageId = storageId;
      }

      mutation({
        title: values.title,
        description: values.description,
        // 3.6.4 send the image id to the convex db
        imageStorageId,
      });
      router.push("/blogs");
    });
  }

  return (
    <div>
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight mt-2">
          Create Blog
        </h1>
        <p className="text-xl text-muted-foreground">Create Your Blogs</p>
      </div>

      <Card className="w-full max-w-xl mx-auto mt-4">
        <CardHeader>
          <CardTitle>Make Your Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input placeholder="Title" {...field} />

                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea placeholder="Description" {...field} />

                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      type="file"
                      placeholder="Upload Your Image"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file ?? null);
                      }}
                    />

                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Creating...{" "}
                  </>
                ) : (
                  "Create Blog"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
