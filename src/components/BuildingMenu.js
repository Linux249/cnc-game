import { devPlayerId } from '../static';
import {
  BUILDING_GOLD,
  BUILDING_METAL,
  BUILDING_POWER,
  BUILDINGS,
  BUILDINGS_ICONS,
  getBuildingCost,
  getBuildingProduction,
  isProduction,
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

function Production({ building }) {
  const type = +building.type;
  const lvl = +building.lvl;
  if (!isProduction(type)) return null;
  const prod = getBuildingProduction(type, lvl);
  const nextLevel = getBuildingProduction(type, lvl + 1) - prod;
  console.log({ prod, nextLevel });
  return (
    <div>
      <h4>Production</h4>
      <span>
        +{short(prod)}/h {BUILDINGS_ICONS[type]}
      </span>
      <h4>next lvl</h4>
      <span>
        +{short(nextLevel)}/h {BUILDINGS_ICONS[type]}
      </span>
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
      <Production building={selected} />
    </div>
  );
}

export default SelectedSlot;
