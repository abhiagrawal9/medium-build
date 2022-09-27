import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';
import { Post } from '../../models/post.model';
import { sanityClient, urlFor } from '../../sanity';

type Props = {
  post: Post;
};

const Post = ({ post }: Props) => {
  return (
    <main>
      <Header />
      <img
        src={urlFor(post.mainImage).url()}
        alt={post.title}
        className='w-full h-40 object-cover'
      />
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light text-gray-500 mb-2'>
          {post.description}
        </h2>
        <div className='flex items-center space-x-2'>
          <img
            className='h-10 w-10 rounded-full'
            src={urlFor(post.author.image).url()}
            alt={post.author.name}
          />
          <p className='font-extralight text-sm'>
            <span className='text-green-600'>{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
      </article>
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
  const query = `*[_type == 'post' && slug.current==$slug][0]{
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

  const post = await sanityClient.fetch(query, { slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
