import { useState } from 'react';
import useSWR from 'swr';
import { devPlayerId } from '../static';
import {
  BUILDINGS,
  BUILDINGS_ICONS,
  getBuildingCost,
  POWER_COST_FACTOR,
} from '../static/buildings';
import { LABEL_LEVEL, LABEL_METAL, LABEL_POWER } from '../static/labels';
import { short } from '../util';

function BuildingTypes({ p }) {
  async function createBuilding(type) {
    console.log('createBuilding', p, type);
    return fetch(`/api/buildings/upgrade?p=${p}&type=${type}&id=${devPlayerId}`);
  }

  return (
    <div>
      <h6>create building</h6>
      <div className="grid grid-cols-2 text-5xl gap-1 mt-2">
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

  const type = +selected.type;

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
      <span className="text-9xl">{BUILDINGS_ICONS[type]}</span>
      <div className="flex justify-between">
        <span>
          {LABEL_LEVEL} {selected?.lvl}
        </span>
        <span className="ml-4 icon bg-gray-300 hover:bg-gray-100 " onClick={increaseLevel}>
          🆙
        </span>
        <span className="ml-2 icon bg-red-100 hover:bg-red-50" onClick={handleDelete}>
          ❌
        </span>
      </div>
      <h6>costs:</h6>
      <h4>
        {LABEL_METAL}: {short(cost)}
      </h4>
      <h4>
        {LABEL_POWER}: {short(cost / POWER_COST_FACTOR)}
      </h4>
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
      <div className="text-7xl text-center m-1">
        <span>{BUILDINGS_ICONS[building?.type]}</span>
      </div>
      {building?.lvl && (
        <div className="m-2 text-2xl text-center">
          <span>
            {LABEL_LEVEL} {building?.lvl}
          </span>
        </div>
      )}
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
