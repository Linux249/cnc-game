import Head from 'next/head';
import Base from '../components/Base';
import Card from '../components/Card';
import CurrentResources from '../components/CurrentResources';
import Menu from '../components/Menu';
import Typography from '../components/typography';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 px-20">
        <h1 className="text-6xl mb-3 font-bold">Welcome to cnc-game</h1>

        <Typography />
        <Menu />
        <CurrentResources />
        <Base />

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
