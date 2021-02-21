import Button from './Button';


const LABEL_LVL_DEF = '🛡';

export default function Base() {
  const name = `Name: Linux`;
  const defenseLevel = `${LABEL_LVL_DEF} ${19}`;

  async function collectResources() {
    // call api to add resources to
    return fetch('/api/resources/collect');
  }

  async function upgradeBuilding() {
    // collect resources before reducing them for build costs
  }

  return (
    <div className="p-6 border  rounded-xl hover:text-blue-600 focus:text-blue-600">
      <h1>base</h1>
      <h3>Buildings</h3>
      <Button onClick={collectResources} text="Collect Ressources"/>
    </div>
  );
}
