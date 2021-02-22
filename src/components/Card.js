import useSWR from 'swr';
import { BUILDING_ARMY_ICON, BUILDING_DEFENS_ICON } from '../static/buildings';
import { LABEL_GOLD, LABEL_METAL, LABEL_XP } from '../static/labels';
import { short } from '../util';

function Image() {
  return <div className="w-full h-24 bg-blue-800" />;
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

export default function Card({ card }) {
  const { title, lvl, resources, attack, defense } = card;
  return (
    <div className="p-6 mt-6 text-left border w-60 rounded-xl hover:text-blue-600 focus:text-blue-600">
      <h3 className="text-2xl font-bold mb-2">
        {title} 🥇 {lvl}
      </h3>
      <Image />
      <div className="grid grid-cols-2">
        <div>
          <p className="mt-1 text-xl">
            {LABEL_METAL} {short(resources.metal)}
          </p>
          <p className=" text-xl">
            {LABEL_GOLD} {short(resources.gold)}
          </p>
          <p className=" text-xl">
            {LABEL_XP} {short(resources.xp)}
          </p>
        </div>
        <div>
          <p className="mt-1 text-xl">
            {BUILDING_ARMY_ICON} {attack}
          </p>
          <p className=" text-xl">
            {BUILDING_DEFENS_ICON} {defense}
          </p>
        </div>
      </div>
    </div>
  );
}
