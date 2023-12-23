import { Author, ContentProps, ImageProps, User } from '@/types/global';

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
  description: ContentProps;
  keywords: string;
  user: User;
  author: Author;
};

export interface Package extends ImageProps, BasicResourceType {
  days: number;
  nights: number;
  price: number;
  persons: number;
  category: Category;
  destinations: Destination[];
}

export interface Destination extends ImageProps, BasicResourceType {}

export interface Activity extends ImageProps, BasicResourceType {}
