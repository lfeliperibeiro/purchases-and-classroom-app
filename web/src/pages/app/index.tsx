import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

import { withApollo } from '../../lib/withApollo';
import { useGetProductsQuery } from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
  useMe,
} from '../../graphql/generated/page';
import { useQuery } from '@apollo/client';

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMe();
  // const { data } = useGetProductsQuery();
  return (
    <div>
      <h1>Hello</h1>
      <pre>{JSON.stringify(me, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
