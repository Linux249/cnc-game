import useSWR from 'swr';
import Timer from './Timer';

const LABEL_LVL_CHAR = '🎮';
const LABEL_LVL_ARMY = '⚔️';
const LABEL_LVL_DEF = '🛡';

export default function Char({ id }) {
  if (!id && false) return null;
  const name = `Name: Linux`;
  const { data: player } = useSWR(`/api/player?id=${id}`);
  if (!player) return <h3>loading</h3>;

  const charLevel = `${LABEL_LVL_CHAR} ${player.hero.level}`;
  const armyLeveL = `${LABEL_LVL_ARMY} ${player.hero.army}`;
  const defenseLevel = `${LABEL_LVL_DEF} ${player.hero.defense}`;

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
