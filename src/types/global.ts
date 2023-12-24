export type Content = {
  time: number;
  blocks: Array<{
    id: string;
    type: string;
    data: {
      text: string;
    };
  }>;
  version: string;
};

export type Image = {
  image_url: string;
  image_alt: string;
};

export type BasicUserType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type User = BasicUserType & {
  email: string;
  email_verified_at: string;
};

export type Author = BasicUserType;

export type FormDataProps = {
  image: File;
  imageAlt: string;
  name: string;
  keywords: string;
  description: {
    time: number;
    blocks: any[];
  };
  author: number;
  publishedAt?: string;
};
