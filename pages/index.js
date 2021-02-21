import Head from 'next/head';

function Image() {

  return <div className="w-full h-24 bg-blue-800"/>
}

const RESOURCES_GROWTH_CAMP = 1.25;

// camp only,
// todo make 3 types,
const BASE_METAL = 100;
const BASE_GOLD = 50;
const BASE_XP = 200;

/**
 * - takes the level and calculate growth factor
 * - todo add variance, 20% base each, 40% random shared
 * @param lvl
 * @returns {{gold: number, metal: number, xp: number}}
 */
function generateResources(lvl = 0) {
  const lvlMulti = RESOURCES_GROWTH_CAMP ** lvl;

  return {
    metal: BASE_METAL * lvlMulti,
    gold: BASE_GOLD * lvlMulti,
    xp: BASE_XP * lvlMulti,
  };
}

function Card() {
  const {title, lvl, resources} = {
    title: 'Camp',
    lvl: 15,
    resources: {
      metal: 100,
      gold: 50,
      xp: 400,
    },
  };
  return <a
    href="/"
    className="p-6 mt-6 text-left border w-60 rounded-xl hover:text-blue-600 focus:text-blue-600"
  >
    <h3 className="text-2xl font-bold mb-2">{title} 🥇 {lvl}</h3>
    <Image />
    <p className="mt-1 text-xl">🪨 {resources.metal}</p>
    <p className=" text-xl">⭐️ {resources.gold}</p>
    <p className=" text-xl">🔬 {resources.xp}</p>
  </a>;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center ">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Card/>
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2"/>
        </a>
      </footer>
    </div>
  );
}
