"use client";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Blog } from "@/types/blog.types";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";
import CreateBlog from "./CreateBlog";
import { blogApi } from "@/lib/blog.api";

interface BlogCardProps {
  blog: Omit<Blog, "isDeleted" | "updatedAt">;
  fetch: () => void;
}

export default function BlogCard({ blog, fetch }: BlogCardProps) {
  const { isAdmin } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Do you want to delete this blog?")) {
      return;
    }

    try {
      await blogApi.deleteBlog(id);
      fetch();
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600">
            {blog.title}
          </Link>
        </h2>

        {blog.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
        )}

        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>Author</span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            href={`/blog/${blog.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more →
          </Link>
        </div>
        {isAdmin && (
          <div className="m-2 space-y-2">
            <button
              className="bg-red-700 block"
              onClick={() => {
                handleDelete(blog._id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-700"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        )}
        {isOpen && (
          <CreateBlog setIsOpen={setIsOpen} fetch={fetch} blog={blog} />
        )}
      </div>
    </div>
  );
}
