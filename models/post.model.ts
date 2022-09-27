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
  _createdAt: string;
  body: any[];
  comments: Comment[];
}

export interface Comment {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}
