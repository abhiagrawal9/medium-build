import React from 'react';

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className='flex items-center justify-between bg-yellow-400 border-y py-10 lg:py-0'>
      <div className='p-10 space-y-5'>
        <h1 className='text-6xl max-w-xl font-serif'>
          <span className='underline decoration-black decoration-4'>
            Medium
          </span>{' '}
          is a place to read, write and connect
        </h1>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi vel
          voluptatum eaque nulla voluptatem id ut laboriosam totam.
        </h2>
      </div>
      <div className='hidden md:inline-flex h-32 lg:h-full'>
        <img
          src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
          alt='Medium Logo'
        />
      </div>
    </div>
  );
};

export default Banner;
