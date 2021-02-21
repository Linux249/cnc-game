const LABEL_LVL_CHAR = '🎮';
const LABEL_LVL_ARMY = '⚔️';
const LABEL_LVL_DEF = '🛡';

export default function Char() {
  const name = `Name: Linux`;
  const charLevel = `${LABEL_LVL_CHAR} ${21}`;
  const armyLeveL = `${LABEL_LVL_ARMY} ${17}`;
  const defenseLevel = `${LABEL_LVL_DEF} ${19}`;
  return (<div className='p-6 border  rounded-xl hover:text-blue-600 focus:text-blue-600'>
    <h1>{name}</h1>
    <h3>{charLevel}</h3>
    <h3>{armyLeveL}</h3>
    <h3>{defenseLevel}</h3>
  </div>);
}
