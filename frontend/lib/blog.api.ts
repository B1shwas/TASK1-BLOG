import api from "./api";

export const blogApi = {
  getAllBlogs: async () => api.get("/blog/all"),
  getBlogById: (id: string) => api.get(`/blog/${id}`),
  getBlogBySlug: (slug: string) => api.get(`/blog/slug/${slug}`),
  createBlog: (data: any) => api.post("/blog/add", data),
  updateBlog: (id: string, data: any) => api.put(`/blog/edit/${id}`, data),
  deleteBlog: (id: string) => api.delete(`/blog/delete/${id}`),
};
