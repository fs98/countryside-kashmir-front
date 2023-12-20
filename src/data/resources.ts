export type Resource = {
  name: 'categories' | 'slides' | 'destinations' | 'packages' | 'blogs' | 'activities';
  variations: {
    singularCapitalized: string;
    pluralLowercase: string;
    pluralCapitalized: string;
  };
};

export const RESOURCES: Record<Resource['name'], Resource['variations']> = {
  categories: {
    singularCapitalized: 'Category',
    pluralLowercase: 'categories',
    pluralCapitalized: 'Categories',
  },
  slides: {
    singularCapitalized: 'Slide',
    pluralLowercase: 'slides',
    pluralCapitalized: 'Slides',
  },
  destinations: {
    singularCapitalized: 'Destination',
    pluralLowercase: 'destinations',
    pluralCapitalized: 'Destinations',
  },
  packages: {
    singularCapitalized: 'Package',
    pluralLowercase: 'packages',
    pluralCapitalized: 'Packages',
  },
  blogs: {
    singularCapitalized: 'Blog',
    pluralLowercase: 'blogs',
    pluralCapitalized: 'Blogs',
  },
  activities: {
    singularCapitalized: 'Activity',
    pluralLowercase: 'activities',
    pluralCapitalized: 'Activities',
  },
};
