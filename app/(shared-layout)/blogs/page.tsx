"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  const blogs = useQuery(api.blogs.getBlogs);
  console.log(blogs);

  if (blogs === undefined) {
    return <div>Loading blogs...</div>;
  }

  if (blogs?.length === 0) {
    return <div>No blogs found. Create one to get started!</div>;
  }

  return (
    <div className="mx-auto p-4 max-w-7xl ">
      <h1 className="text-4xl font-bold mb-4 text-center tracking-tight">
        Blogs
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Card key={blog._id}>
            <div className="relative overflow-hidden h-48 w-full">
              <Image
                src={
                  blog.imageId ??
                  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={blog.title}
                fill
              />
            </div>

            <CardContent className="p-2">
              <Link href={`/blogs/${blog._id}`} className="hover:text-primary">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                {/* <p className="text-gray-700 line-clamp-2">{blog.description}</p> */}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
