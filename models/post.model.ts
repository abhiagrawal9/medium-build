interface Author {
  image: string;
  name: string;
}

interface MainImage {
  _type: string;
  asset: {
    url: string;
  };
}

interface Slug {
  _type: string;
  current: string;
}

export interface Post {
  _id: string;
  author: Author;
  description: string;
  mainImage: MainImage;
  slug: Slug;
  title: string;
}
