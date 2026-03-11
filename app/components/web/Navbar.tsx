import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center gap-4">
      <div>
        <Link href="/" className="font-extrabold text-3xl">
          Next<span className="text-purple-800">Pro</span>
        </Link>
      </div>
      <div className="flex gap-4 ">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/create-blog">Create Blog</Link>
      </div>

      <div className="flex gap-4">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}
