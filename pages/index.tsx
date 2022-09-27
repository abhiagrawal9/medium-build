import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import { sanityClient } from '../sanity';
import type { Post } from '../models/post.model';
import { GetServerSideProps } from 'next';
import Posts from '../components/Posts';

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
      <Posts posts={posts} />
    </div>
  );
};

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

export default Home;
