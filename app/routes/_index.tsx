import {Outlet} from '@remix-run/react';
import type {MetaFunction} from '@shopify/remix-oxygen';
import {Layout} from '~/components/Layout';
import {useRootLoaderData} from '~/root';
import favicon from '~/assets/favicon.svg';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';

export const meta: MetaFunction = () => [
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
];

export function links() {
  return [
    {rel: 'stylesheet', href: resetStyles},
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export default function Index() {
  const rootData = useRootLoaderData();

  return (
    // @ts-expect-error
    <Layout {...rootData}>
      <Outlet />
    </Layout>
  );
}
