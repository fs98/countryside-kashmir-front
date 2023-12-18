import { MouseEventHandler } from 'react';

import { Button } from '@mui/material';
import Link from 'next/link';

type CardProps = {
  data: {
    image_url: string;
    image_alt: string;
    title: string;
    subtitle?: string;
    keywords?: string;
  };
  onDelete: MouseEventHandler<HTMLButtonElement>;
  editUrl: string;
};

export const Card = ({ data, onDelete, editUrl }: CardProps) => {
  const { image_url, image_alt, title, subtitle, keywords } = data;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image_url} alt={image_alt} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>

        {subtitle && <p className="text-gray-700 text-base">{subtitle}</p>}

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

      {keywords && (
        <div className="px-6 pt-4 pb-2">
          {keywords.split(',').map((keyword, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{keyword.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
