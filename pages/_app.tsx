import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import { UserProvider, useUser } from '@auth0/nextjs-auth0';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';

import { firebaseConfig } from '../utils/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  firebase.initializeApp(firebaseConfig);

  return (
    <>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
const Navbar = () => {
  const { user } = useUser();

 

  return (
    <>
      <div className="w-full h-20 bg-gray-300 shadow-md flex flex-wrap align-baseline items-center justify-between">
        <div className="p-4 font-bold">
          <Link href="/">
            <a>Acasa</a>
          </Link>
        </div>

        {user && (
          <div className="p-4 font-bold">
            <Link href="/livrabile">
              <a>Livrabile</a>
            </Link>
          </div>
        )}

        {!user && (
          <div className="p-4 font-bold">
            <Link href="/api/auth/login">
              <a>Login</a>
            </Link>
          </div>
        )}

        {user && (
          <div className="p-4 font-bold">
            <Link href="/api/auth/logout">
              <a>Log Out</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
