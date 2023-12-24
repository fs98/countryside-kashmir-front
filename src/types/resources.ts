import { Author, Content, Image, User } from '@/types/global';

export type Category = {
  id: Number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type BasicResourceType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  slug: string;
  description?: Content;
  content?: Content;
  keywords: string;
  user: User;
  author: Author;
};

export interface Package extends Image, BasicResourceType {
  days: number;
  nights: number;
  price: number;
  persons: number;
  category: Category;
  destinations: Destination[];
}

export interface Destination extends Image, BasicResourceType {}

export interface Activity extends Image, BasicResourceType {}
export interface Blog extends Image, BasicResourceType {
  title: string;
  published_at: string;
}
