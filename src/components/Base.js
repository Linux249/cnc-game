import { useState } from 'react';
import useSWR from 'swr';
import { devPlayerId } from '../static';
import {
  BUILDINGS,
  BUILDINGS_ICONS,
  getBuildingCost,
  POWER_COST_FACTOR,
} from '../static/buildings';
import { LABEL_METAL, LABEL_POWER } from '../static/labels';
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

  const type = +selected?.type;

  function increaseLevel() {
    console.log('increase level', p);
    return fetch(`/api/buildings/upgrade?p=${p}&id=${devPlayerId}`);
  }

  function handleDelete() {
    console.log('delete building', p);
    return fetch(`/api/buildings/upgrade?p=${p}&id=${devPlayerId}&type=-1`);
  }

  const cost = getBuildingCost(type, selected.lvl);
  return (
    <div className="text-left">
      <div>type: {BUILDINGS_ICONS[type]}</div>
      <div>lvl: {selected?.lvl}</div>
      <h4>costs:</h4>
      <h6>
        {LABEL_METAL}: {short(cost)}
      </h6>
      <h6>
        {LABEL_POWER}: {short(cost / POWER_COST_FACTOR)}
      </h6>
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

  function handleSelect(p) {
    console.log('select ', p);
    setSelected(p);
  }

  const selectedSlot = buildings && buildings[selected];

  return (
    <div className="flex">
      <div className="card">
        <h1>base</h1>
        <h6>Selected: {selected}</h6>
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
