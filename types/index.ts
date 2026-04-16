export interface Review {
  name: string;
  handle: string;
  title: string;
  size: string;
  rating: number;
  image: string;
  excerpt: string;
  avatar: string;
}

export interface ReviewCardProps extends Review {
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  likes?: number;
  comments?: number;
  photoCount?: number;
  index?: number;
}
