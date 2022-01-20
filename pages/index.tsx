import { useUser } from '@auth0/nextjs-auth0';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
  const [input, setInput] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const sendData = () => {
    if (user) {
      const body = {
        link: input,
        user: user?.email,
      };

      fetch('http://localhost:3000/api/firebase/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }
  };

  return (
    <>
      {user && (
        <>
          <div className="container text-center">
            <h3 className="m-7 font-bold">Introdu link-ul</h3>
            <input
              value={input}
              onChange={(e: any) => {
                setInput(e.target.value);
              }}
              type="text"
              className="h-10 w-2/3 m-5 bg-gray-200 rounded-md border-b-2 border-black indent-2"
            />
            <button
              onClick={() => sendData()}
              className="block mx-auto bg-green-400 px-5 py-2 rounded-lg font-bold"
            >
              Trimite
            </button>
          </div>
        </>
      )}

      {!user && (
        <div className="container text-center">
          <h3 className="m-7 font-bold">Logheaza-te pentru a avea acces</h3>
        </div>
      )}
    </>
  );
};

export default Home;
