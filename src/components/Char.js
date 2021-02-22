import useSWR from 'swr';
import { BUILDING_ARMY_ICON, BUILDING_BASE_ICON, BUILDING_DEFENS_ICON } from '../static/buildings';
import Timer from './Timer';

export default function Char({ id }) {
  if (!id && false) return null;
  const name = `Name: Linux`;
  const { data: player } = useSWR(`/api/player?id=${id}`);
  if (!player) return <h3>loading</h3>;

  const charLevel = `${BUILDING_BASE_ICON} ${player.hero.lvl}`;
  const armyLeveL = `${BUILDING_ARMY_ICON} ${player.hero.army}`;
  const defenseLevel = `${BUILDING_DEFENS_ICON} ${player.hero.defense}`;

  return (
    <div className="card">
      <h1>{name}</h1>
      <h3>
        {charLevel} {armyLeveL} {defenseLevel}
      </h3>
      <Timer />
    </div>
  );
}
