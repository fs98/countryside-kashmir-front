import { FC } from 'react';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';

import { Block } from '@/components/Block/Block';
import { ImageHeaderLayout } from '@/layouts/ImageHeaderLayout';
import { axios } from '@/lib/axios';
import { Image } from '@/types/global';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

type GalleryProps = {
  galleryImages: Image[];
};

const Gallery: FC<GalleryProps> = ({ galleryImages }) => (
  <ImageHeaderLayout title="Gallery - Countryside Kashmir" heading="Gallery">
    <Block
      title="Paradise on earth"
      subtitle="Check some of the most beautiful pictures of Kashmir">
      <LightGallery
        elementClassNames="grid gap-1 grid-cols-5 mt-6 place-content-center"
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        animateThumb={true}>
        {galleryImages.map(({ image_url, image_alt }, i) => (
          <a key={i} href={image_url}>
            <img
              className="object-fill bg-gray-500 m-0 w-full h-full"
              alt={image_alt}
              src={image_url}
            />
          </a>
        ))}
      </LightGallery>
    </Block>
  </ImageHeaderLayout>
);

export const getServerSideProps = async () => {
  const galleryImages = await axios
    .get('/api/guest/gallery-images')
    .then(res => res.data.data)
    .catch(error => {
      if (error.response.status !== 409) throw error;
    });

  return {
    props: {
      galleryImages,
    },
  };
};

export default Gallery;
