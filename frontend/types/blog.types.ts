export interface Blog {
  _id: string;
  title: string;
  description?: string;
  content: string;
  author: string;
  slug: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}
