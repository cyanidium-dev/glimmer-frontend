export type Product = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  discountPrice?: number;
  mainImage?: string;
  status: "inStock" | "preOrder";
  isBestseller: boolean;
  isNew: boolean;
  categorySlug: string;
  categoryTitle: string;
  genreSlug?: string;
  genreTitle?: string;
  reviews: { author: string; rating: number; text: string }[];
};
