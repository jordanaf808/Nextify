import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

/**
 * NextAuth uses SessionProvider to persist the state of authorization 
 * and pass it to other components.
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <RecoilRoot>
        <SessionProvider session={session}> 
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    );
}

export default MyApp;
