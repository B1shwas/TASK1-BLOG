"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { blogApi } from "@/lib/blog.api";
import { Blog } from "@/types/blog.types";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await blogApi.getBlogBySlug(slug);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Blog not found
        </h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to blogs</span>
      </Link>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Author</span>
            </div>
          </div>

          {blog.description && (
            <p className="text-lg text-black  mb-6 italic">
              {blog.description}
            </p>
          )}

          <div className="text-black">
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            />
          </div>
        </div>
      </article>
    </div>
  );
}
