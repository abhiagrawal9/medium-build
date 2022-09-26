import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';
import { Post } from '../../models/post.model';
import { sanityClient, urlFor } from '../../sanity';

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  console.log(post);
  return (
    <main>
      <Header />
    </main>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const query = `
    *[_type == 'post']{
  _id,
  slug {
  current
}
}
  `;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params!;
  console.log('helllo : ' + slug);
  const query = `*[_type == 'post' && slug.current=='${slug}'][0]{
    _id,
    _createdAt,
    title,
    slug,
    author -> {
      name,
      image
    },
    description,
  mainImage,
body
  }`;

  const post = await sanityClient.fetch(query);

  return {
    props: {
      post,
    },
  };
};
