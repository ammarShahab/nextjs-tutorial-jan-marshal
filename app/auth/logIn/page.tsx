"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../schema/auth";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function LogInPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // console.log(data);

    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Login successful");
            router.replace("/");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription> Please login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="john@doe.com"
                    type="email"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}></FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="*******"
                    type="password"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}></FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" disabled={isPending}>
            {" "}
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              " Log In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
