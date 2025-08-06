export type Product = {
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
};
