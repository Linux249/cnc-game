import { useState } from 'react';
import useSWR from 'swr';
import { devPlayerId } from '../static';
import { BUILDINGS, BUILDINGS_ICONS } from '../static/buildings';
import Button from './Button';

function BuildingTypes({ p }) {
  async function createBuilding(type) {
    console.log('createBuilding', p, type);
    return fetch(`/api/buildings/upgrade?p=${p}&type=${type}&id=${devPlayerId}`);
  }

  return (
    <div>
      <h1>Select new building</h1>
      <div className="grid grid-cols-3 text-3xl">
        {BUILDINGS.map(b => (
          <span onClick={() => createBuilding(b)}>{BUILDINGS_ICONS[b]}</span>
        ))}
      </div>
    </div>
  );
}

function SelectedSlot({ selected, p }) {
  console.log({ selected });
  if (selected === null) return <BuildingTypes p={p} />;
  return (
    <div className="">
      <div>type: {BUILDINGS_ICONS[+selected?.type]}</div>
      <div>lvl: {selected?.lvl}</div>
    </div>
  );
}

function Building({ building, select, active }) {
  console.log(active);
  const cardStyle = active ? ' border-8 bg-red-100' : 'bg-blue-800';
  return (
    <div onClick={select} className={'w-32 h-32 ' + cardStyle}>
      <h1>{BUILDINGS_ICONS[building?.type]}</h1>
      <p>{building?.lvl}</p>
    </div>
  );
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
    <div className="flex">
      <div className="p-6 border rounded-xl hover:bg-grey-400 focus:text-blue-600">
        <h1>base</h1>
        <h3>Buildings - selected: {selected}</h3>
        <Button onClick={() => upgradeBuilding(2)} text="upgrade building 2" />
        <div className="grid grid-cols-3 gap-8">
          {buildings?.map((b, i) => (
            <Building building={b} select={() => handleSelect(i)} active={selected === i} />
          ))}
        </div>
      </div>
      <div className="p-6 border rounded-xl">
        {selected !== null && <SelectedSlot p={selected} selected={selectedSlot} />}
      </div>
    </div>
  );
}
