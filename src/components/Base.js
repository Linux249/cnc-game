import { useState } from 'react';
import useSWR from 'swr';
import { devPlayerId } from '../static';
import Button from './Button';


function SelectedSlot({ selected }) {
  if (selected === null) return <div>empty</div>;
  const { type } = selected;
  return <div>slot: {selected?.type}</div>;
}

function Building({ building, select, active }) {
  console.log(active);
  const cardStyle = active ? ' border-8 bg-red-100' : 'bg-blue-800';
  return <div onClick={select} className={'w-32 h-32 ' + cardStyle}>
    <h1>{building?.type}</h1>
    <p>{building?.lvl}</p>
  </div>;
}

export default function Base() {
  const [selected, setSelected] = useState(null);
  const { data: buildings } = useSWR('/api/buildings?id=' + devPlayerId);

  async function upgradeBuilding(p) {
    console.log('upgradeBuilding', p);
    // call api to add resources to
    return fetch(`/api/buildings/upgrade?p=${p}`);
  }


  function handleSelect(p) {
    console.log('select ', p);
    setSelected(p);
  }

  const selectedSlot = buildings && buildings[selected];

  return (
    <div className='p-6 border  rounded-xl hover:text-blue-600 focus:text-blue-600'>
      <h1>base</h1>
      <h3>Buildings - selected: {selected}</h3>
      <Button onClick={() => upgradeBuilding(2)} text='upgrade building 2' />
      {selected !== null && <SelectedSlot selected={selectedSlot} />}
      <div className='grid grid-cols-3 gap-8'>
        {buildings?.map((b, i) => <Building building={b} select={() => handleSelect(i)} active={selected === i} />)}
      </div>
    </div>
  );
}
