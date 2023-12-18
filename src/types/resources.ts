import { Author, BasicResourceType, ContentProps, ImageProps, User } from './global';

export interface Package extends ImageProps, BasicResourceType {
  slug: string;
  description: ContentProps;
  keywords: string;
  user: User;
  author: Author;
}

export interface Destination extends ImageProps, BasicResourceType {
  slug: string;
  description: ContentProps;
  keywords: string;
  user: User;
  author: Author;
}

export interface Activity extends ImageProps, BasicResourceType {
  slug: string;
  description: ContentProps;
  keywords: string;
  user: User;
  author: Author;
}
