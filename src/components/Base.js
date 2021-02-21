import { useState } from 'react';
import useSWR from 'swr';
import { devPlayerId } from '../static';
import { BUILDINGS, BUILDINGS_ICONS, getBuildingCost } from '../static/buildings';
import { short } from '../util';
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

  function increaseLevel() {
    console.log('increase level', p);
    return fetch(`/api/buildings/upgrade?p=${p}&id=${devPlayerId}`);
  }

  function handleDelete() {
    console.log('delete building', p);
    return fetch(`/api/buildings/upgrade?p=${p}&id=${devPlayerId}&type=-1`);
  }
  const cost = getBuildingCost(selected.type, selected.lvl);
  return (
    <div className="text-left">
      <div>type: {BUILDINGS_ICONS[+selected?.type]}</div>
      <div>lvl: {selected?.lvl}</div>
      <h4>costs: {short(cost)}</h4>
      <h4>costs: {short(cost / 4)}</h4>
      <div>
        <Button onClick={increaseLevel} text="upgrade level" />
        <Button onClick={handleDelete} text="delete" />
      </div>
    </div>
  );
}

function Building({ building, select, active }) {
  console.log(active);
  const cardStyle = active
    ? ' border-8 bg-red-100'
    : 'bg-gradient-to-r  from-transparent from-red-400 to-blue-400';
  return (
    <div onClick={select} className={'w-32 h-32 ' + cardStyle}>
      <span className="text-8xl">{BUILDINGS_ICONS[building?.type]}</span>
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
      <div className="card">
        <h1>base</h1>
        <h3>Buildings - selected: {selected}</h3>
        <Button onClick={() => upgradeBuilding(2)} text="upgrade building 2" />
        <div className="grid grid-cols-3 gap-8">
          {buildings?.map((b, i) => (
            <Building building={b} select={() => handleSelect(i)} active={selected === i} />
          ))}
        </div>
      </div>
      <div className="card w-48">
        {selected !== null && <SelectedSlot p={selected} selected={selectedSlot} />}
      </div>
    </div>
  );
}
