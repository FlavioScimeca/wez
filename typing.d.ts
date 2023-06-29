export interface Article {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  articles?: Article[];
  createdAt: string;
  updateAt: string;
}
