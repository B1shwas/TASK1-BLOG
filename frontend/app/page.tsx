"use client";
import BlogCard from "@/components/BlogCard";
import { blogApi } from "@/lib/blog.api";
import { Blog } from "@/types/blog.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { isLoggedIn, isAdmin } = useAuthStore();
  const [isLog, setIsLog] = useState<boolean>();
  useEffect(() => {
    fetchBlogs();
    const checkLogin = async () => {
      let log = await isLoggedIn();
      setIsLog(log);
    };
    checkLogin();

    console.log(blogs);
  }, []);

  const fetchBlogs = async () => {
    const response = await blogApi.getAllBlogs();
    setBlogs(response.data);
  };
  return (
    <div className="m-5">
      {!isLog && (
        <Link href="/login" className=" p-4 bg-white rounded-md text-black">
          Login to add blogs (for admin only)
        </Link>
      )}
      <div className=" flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            blog={{
              _id: blog._id,
              slug: blog.slug,
              title: blog.title,
              content: blog.content,
              author: blog.author,
              createdAt: blog.createdAt,
              description: blog.description,
            }}
          />
        ))}
      </div>
    </div>
  );
}
