import { useState } from 'react';
import useSWR from 'swr';
import { BUILDINGS_ICONS } from '../static/buildings';
import { LABEL_LEVEL } from '../static/labels';
import BuildingMenu from './BuildingMenu';
import CurrentResources from './CurrentResources';

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

export default function Base({ id }) {
  const [selected, setSelected] = useState(null);
  const { data: buildings } = useSWR(`/api/buildings?id=${id}`);

  function handleSelect(p) {
    console.log('select ', p);
    setSelected(p);
  }

  const selectedSlot = buildings && buildings[selected];

  return (
    <>
      <CurrentResources id={id} />
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
          {selected !== null && <BuildingMenu p={selected} selected={selectedSlot} id={id} />}
        </div>
      </div>
    </>
  );
}
