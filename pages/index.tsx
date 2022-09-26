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
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Banner />

      {/* Posts */}
      <div>
        {posts.map((post: Post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div>
                <img src={urlFor(post.mainImage).url()!} alt={post.title} />
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
