import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 7.3 create blog schema
interface BlogIdProps {
  params: Promise<{ blogId: Id<"blogs"> }>;
}

//  7.0 show individual blog
export default async function BlogPage({ params }: BlogIdProps) {
  const blogId = await params;
  const blog = await fetchQuery(api.blogs.getBlogById, blogId);

  if (!blog) {
    return (
      <div>
        <h3 className="text-3xl text-red-500">Blog not found</h3>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/blogs"
        className="mb-1.5 mt-0.5 px-2 py-4 rounded-xl hover:bg-muted hover:text-foreground flex gap-1.5 justify-center items-center w-1/4 border"
      >
        <ArrowLeft className="size-4" /> Go Back
      </Link>
      <div className="border-0 rounded-t-lg shadow-lg overflow-hidden">
        <Image
          src={
            blog.imageUrl ??
            "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blog.title}
          className="w-full object-fill hover:scale-101 duration-300 ease-in-out"
          width={500}
          height={300}
        />
        <div className="my-5 px-1">
          <h3 className="text-3xl font-bold">{blog.title}</h3>
          <Separator className="mt-2 mb-2" />
          <p>{blog.description}</p>
          <Separator className="mt-2 mb-2" />

          <p className="mt-4 text-gray-400">
            Created At: {new Date(blog._creationTime).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
