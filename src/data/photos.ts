import landscape0359 from '../assets/photos/landscape/IMG_0359.jpg';
import landscape0459 from '../assets/photos/landscape/IMG_0459.jpg';
import landscape1391 from '../assets/photos/landscape/IMG_1391.jpg';
import landscape2608 from '../assets/photos/landscape/IMG_2608.jpg';
import landscape4169 from '../assets/photos/landscape/IMG_4169.jpg';
import landscape4367 from '../assets/photos/landscape/IMG_4367.jpg';
import landscape4599 from '../assets/photos/landscape/IMG_4599.jpg';
import landscape8799 from '../assets/photos/landscape/IMG_8799.jpg';
import landscape9150 from '../assets/photos/landscape/IMG_9150.jpg';

import eats1034 from '../assets/photos/eats/IMG_1034.jpg';
import eats1188 from '../assets/photos/eats/IMG_1188.jpg';
import eats1732 from '../assets/photos/eats/IMG_1732.jpg';
import eats2020 from '../assets/photos/eats/IMG_2020.jpg';
import eats3794 from '../assets/photos/eats/IMG_3794.jpg';

import life2510 from '../assets/photos/life/IMG_2510.jpg';
import life4677 from '../assets/photos/life/IMG_4677.jpg';
import life4694 from '../assets/photos/life/IMG_4694.jpg';
import life7922 from '../assets/photos/life/IMG_7922.jpg';
import life9872 from '../assets/photos/life/IMG_9872.jpg';

export type PhotoCategoryId = 'landscape' | 'eats' | 'life';

export type PhotoItem = {
  image: string;
  text?: string;
};

export type PhotoCategory = {
  id: PhotoCategoryId;
  label: string;
  color: string;
  items: PhotoItem[];
};

export const photoCategories: PhotoCategory[] = [
  {
    id: 'landscape',
    label: 'landscape',
    color: '#3a3a3a',
    items: [
      { image: landscape0359 },
      { image: landscape0459 },
      { image: landscape1391 },
      { image: landscape2608 },
      { image: landscape4169 },
      { image: landscape4367 },
      { image: landscape4599 },
      { image: landscape8799 },
      { image: landscape9150 }
    ]
  },
  {
    id: 'eats',
    label: 'eats',
    color: '#3a3a3a',
    items: [
      { image: eats1034 },
      { image: eats1188 },
      { image: eats1732 },
      { image: eats2020 },
      { image: eats3794 }
    ]
  },
  {
    id: 'life',
    label: 'life',
    color: '#3a3a3a',
    items: [
      { image: life2510 },
      { image: life4677 },
      { image: life4694 },
      { image: life7922 },
      { image: life9872 }
    ]
  }
];
