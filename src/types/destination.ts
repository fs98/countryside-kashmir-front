import { Author, ContentProps, ImageProps, User } from './global';

export type Destination = ImageProps & {
  id: number;
  name: string;
  slug: string;
  description: ContentProps;
  keywords: string;
  created_at: string;
  updated_at: string;
  user: User;
  author: Author;
};
