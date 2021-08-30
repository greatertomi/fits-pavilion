import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';

import '../components/styles/nprogress.css';

Router.events.on('routerChangeStart', () => NProgress.start());
Router.events.on('routerChangeComplete', () => NProgress.done());
Router.events.on('routerChangeError', () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
