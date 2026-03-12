"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
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
        <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
          Blog
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href="/create-blog"
        >
          Create Blog
        </Link>
      </div>

      <div className="flex gap-4">
        <ThemeToggle />
        <Link className={buttonVariants()} href="/auth/login">
          Login
        </Link>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/auth/sign-up"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
