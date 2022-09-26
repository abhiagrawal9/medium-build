import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';
import type { Post } from '../models/post.model';

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>s
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post: Post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                <img
                  className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                  src={urlFor(post.mainImage).url()!}
                  alt={post.title}
                />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-xs'>
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()}
                    alt={post.title}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { url } from 'inspector';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
    name,
    image
    },
    description,
  mainImage,
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
