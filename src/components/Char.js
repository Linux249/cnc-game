import Timer from './Timer';

const LABEL_LVL_CHAR = '🎮';
const LABEL_LVL_ARMY = '⚔️';
const LABEL_LVL_DEF = '🛡';

export default function Char({ id }) {
  if (!id && false) return null;
  const name = `Name: Linux`;
  const charLevel = `${LABEL_LVL_CHAR} ${21}`;
  const armyLeveL = `${LABEL_LVL_ARMY} ${17}`;
  const defenseLevel = `${LABEL_LVL_DEF} ${19}`;
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
