"use client";
import { blogApi } from "@/lib/blog.api";
import { Blog } from "@/types/blog.types";
import React, { useEffect, useState } from "react";

interface CreateBlogProps {
  setIsOpen: (open: boolean) => void;
  fetch: () => void;
  blog?: Omit<Blog, "isDeleted" | "updatedAt">;
}

export default function CreateBlog({
  setIsOpen,
  fetch,
  blog,
}: CreateBlogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description ?? "");
      setContent(blog.content);
      setSlug(blog.slug);
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (blog) {
        await blogApi.updateBlog(blog._id, {
          title,
          description,
          content,
          slug,
        });
      } else {
        await blogApi.createBlog({ title, description, content, slug });
      }
      fetch();
      setIsOpen(false);
    } catch (err) {
      console.error("Blog operation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-black text-xl"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-center text-black mb-6">
          {blog ? "Edit Blog" : "Create Blog"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
              required
              disabled={!!blog}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-black rounded-md text-black"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {loading
              ? blog
                ? "Updating..."
                : "Creating..."
              : blog
              ? "Update Blog"
              : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
