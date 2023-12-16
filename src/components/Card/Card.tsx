import { Button } from '@mui/material';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type CardProps = {
  data: {
    image_url: string;
    image_alt: string;
    title: string;
    subtitle: string;
  };
  onDelete: MouseEventHandler<HTMLButtonElement>;
  editUrl: string;
  tags?: string[];
};

export const Card = ({ data, onDelete, editUrl, tags }: CardProps) => {
  const { image_url, image_alt, title, subtitle } = data;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image_url} alt={image_alt} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{subtitle}</p>
        <Button
          onClick={onDelete}
          variant="outlined"
          color="error"
          type="submit"
          sx={{ marginTop: 1 }}>
          Delete
        </Button>
        <Link href={editUrl} className="hidden">
          <Button
            variant="outlined"
            color="primary"
            type="button"
            sx={{ marginTop: 1, marginLeft: 1 }}>
            Edit
          </Button>
        </Link>
      </div>

      {tags && tags.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
