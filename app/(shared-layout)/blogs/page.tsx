"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="grid gap-4">
        {blogs?.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
