import product15 from 'assets/img/products/60x60/15.png';
import team24 from 'assets/img/team/40x40/24.webp';
import { BadgeBg } from 'components/base/Badge';

export type LatestReviewsTableDataType = {
  product: string;
  productImage: string;
  customer: {
    name: string;
    avatar?: string;
    variant?: 'image' | 'name';
    avatarPlaceholder?: boolean;
  };
  rating: number;
  review: string;
  status: {
    title: string;
    badgeBg: BadgeBg;
    icon: string;
  };
  time: string;
};

export const latestReviewsTableData: LatestReviewsTableDataType[] = [
  {
    product: 'Sony X85J 75 Inch Sony 4K Ultra HD LED Smart Google TV',
    productImage: product15,
    customer: {
      name: 'Suzanne Martinez',
      avatar: team24
    },
    rating: 3.5,
    review:
      "This theme is great. Clean and easy to understand. Perfect for those who don't have time to start everything from scratch. The support is simply phenomenal! Highly recommended!",
    status: {
      title: 'Approved',
      badgeBg: 'success',
      icon: 'check'
    },
    time: 'Nov 03, 10:43 AM'
  }
];
