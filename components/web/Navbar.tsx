"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ThemeToggle = dynamic(
  () => import("@/components/web/theme-toggle").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
  },
);

export function Navbar() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  console.log("Is authenticated From Navbar: ", isAuthenticated);

  return (
    <nav className="flex justify-between items-center gap-4">
      <div>
        <Link href="/" className="font-extrabold text-3xl">
          Next<span className="text-purple-800">Pro</span>
        </Link>
      </div>
      <div className="flex gap-4 ">
        <Link className={buttonVariants({ variant: "ghost" })} href="/">
          Home
        </Link>

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href="/create-blog"
        >
          Create Blog
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/blogs">
          Blogs
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href="/create-task"
        >
          Create Task
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/tasks">
          Tasks
        </Link>
      </div>

      <div className="flex gap-4">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logout successful");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/logIn">
              Login
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/auth/sign-up"
            >
              Register
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
