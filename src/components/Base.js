import useSWR from 'swr';
import { devPlayerId } from '../static';
import Button from './Button';


function Building({ building }) {
  return <div className="bg-blue-800 w-32 h-32">
    <h1>{building?.type}</h1>
    <p>{building?.lvl}</p>
  </div>;
}

export default function Base() {

  const { data: buildings } = useSWR('/api/buildings?id=' + devPlayerId);

  async function upgradeBuilding(p) {
    console.log('upgradeBuilding', p);
    // call api to add resources to
    return fetch(`/api/buildings/upgrade?p=${p}`);
  }


  return (
    <div className='p-6 border  rounded-xl hover:text-blue-600 focus:text-blue-600'>
      <h1>base</h1>
      <h3>Buildings</h3>
      <Button onClick={() => upgradeBuilding(2)} text='upgrade building 2' />
      <div className="grid grid-cols-3 gap-8">

      {buildings?.map(b => <Building building={b} />)}
      </div>
    </div>
  );
}
