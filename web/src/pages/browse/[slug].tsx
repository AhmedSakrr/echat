import React from 'react';
import withApollo from 'src/utils/apollo/withApollo';
import { Wrapper } from 'src/components/Wrapper';
import { Sidebar } from 'src/components/utils/Sidebar';
import {
  useFilterUserServiceQuery,
} from 'src/generated/graphql';
import gray from '/public/gray.png';
import { NextPage } from 'next';


const Browse: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: userService, loading: userServiceLoading } =
    useFilterUserServiceQuery({ variables: { slug } });

  return (
    <Wrapper navbar className=''>
      <div className='flex'>
        <Sidebar />
        <div className='mt-2 grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 text-white'>
          {!userServiceLoading &&
            userService?.filterUserService?.map(({ user }, index) => (
              <div
                key={index}
                className='bg-white dark:bg-dark dark:text-white flex flex-col select-none mx-1 rounded-xl'
              >
                <h1 className='text-base my-1 font-semibold text-center text-black dark:text-white'>
                  {user.username}
                </h1>
                <img
                  src={
                    user && user.images && user.images[0]
                      ? user.images[0].url
                      : gray.src
                  }
                  className='h-auto'
                />
                <div className='flex sm:flex-1 flex-col gap-2 p-1 '>
                  <div className='flex mt-auto items-center justify-between text-sm'>
                    <div className='flex items-center justify-center'>
                      Status
                    </div>
                    <p className='text-black dark:text-white text-center'></p>
                  </div>

                  <div className='flex justify-between mt-auto'></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

Browse.getInitialProps = ({ query }) => {
  return {
    slug: query.slug as string,
  };
};

export default withApollo({ ssr: true })(Browse);
