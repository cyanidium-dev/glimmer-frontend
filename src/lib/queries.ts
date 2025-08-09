export const allInstagramPostsQuery = `
  *[_type == "instagram"][0]{
    "posts": posts[]{
      "image": image.asset->url,
      "alt": image.alt,
      "url": url
    }
  }
`;

export const allCategoriesQuery = `
  *[_type == "category"]{
    "id": _id,
    title,
    "slug": slug.current,
    order,
    genres[]->{
      "title": name,
      "slug": slug.current
    }
  }
`;

export const allProductsQuery = `*[_type == "product"]{
    "slug": slug.current,
    title,
    author,
    price,
    discountPrice,
    "mainImage": gallery[0].asset->url,
    status,
    isBestseller,
    isNew,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "genreSlug": genre->slug.current,
    "genreTitle": genre->name
  }`;

export const homepageCombinedQuery = `{
  "heroBanners": *[_type == "heroBanner"] | order(order asc) {
    title,
    description,
    "image": image.asset->url,
    button {
      label,
      link,
      position
    },
    order
  },
  "homepageBanners": *[_type == "homepageBanner"] | order(order asc) {
    "imageSmall": imageSmall.asset->url,
    "imageLarge": imageLarge.asset->url,
    "imageCatalog": imageCatalog.asset->url,
    link,
    showOnCatalog,
    order
  },
  "products": *[_type == "product"]{
    "id": _id,
    "slug": slug.current,
    title,
    author,
    price,
    discountPrice,
    "mainImage": gallery[0].asset->url,
    status,
    isBestseller,
    isNew,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "genreSlug": genre->slug.current,
    "genreTitle": genre->name
  },
  "instagram": *[_type == "instagram"][0]{
    "posts": posts[] {
      "image": image.asset->url,
      "alt": image.alt,
      "url": url
    }
  }
}`;

export const allDiscountedProductsQuery = `
  *[_type == "product" && defined(discountPrice)]{
    "id": _id,
    "slug": slug.current,
    title,
    author,
    price,
    discountPrice,
    "mainImage": gallery[0].asset->url,
    status,
    isBestseller,
    isNew,
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "genreSlug": genre->slug.current,
    "genreTitle": genre->title
  }
`;

export const allProductsByCategoryQuery = `
*[_type == "category" && slug.current == $categorySlug][0]{
  "categoryTitle": title,
  "categorySlug": slug.current,
  "genres": genres[]->{
    "genreTitle": name,
    "genreSlug": slug.current,
    "products": *[
      _type == "product" && references(^._id)
    ]{
      "id": _id,
      title,
      author,
      "slug": slug.current,
      price,
      discountPrice,
      "mainImage": gallery[0].asset->url,
       "reviews": reviews[]{
        author,
        rating,
        text
      },
      status,
      preOrderShippingDate,
      isBestseller,
      isNew
    }
  },
  "allProducts": *[
    _type == "product" && references(^._id)
  ]{
    "id": _id,
    title,
    author,
    "slug": slug.current,
    price,
    discountPrice,
    description,
    "mainImage": gallery[0].asset->url,
    "reviews": reviews[]{
      author,
      rating,
      text
    },
    status,
    isBestseller,
    isNew
  }
}
`;
