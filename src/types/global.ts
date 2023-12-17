export type ContentProps = {
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

export type ImageProps = {
  image_url: string;
  image_alt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type Author = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  title: string;
  type: 'success' | 'error';
};
