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

export type BasicResourceType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type User = BasicResourceType & {
  email: string;
  email_verified_at: string;
};

export type Author = BasicResourceType;
