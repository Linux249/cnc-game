import Head from 'next/head';
import { useState } from 'react';
import Base from '../components/Base';
import Card from '../components/Card';
import Menu from '../components/Menu';
import Overlay from '../components/Overlay';
import Typography from '../components/typography';

export default function Home() {
  const [id, setID] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Overlay />
      <main className="flex flex-col items-center justify-center flex-1 px-20">
        <h1 className="text-6xl mb-3 font-bold">Welcome to cnc-game</h1>

        <Typography />

        <Menu id={id} setID={setID} />

        {id && <Base id={id} />}

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Card />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          CnC Game Prototype - power by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
