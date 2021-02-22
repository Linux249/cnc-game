import useSWR from 'swr';
import { devPlayerId } from '../static';
import { LABEL_GOLD, LABEL_METAL, LABEL_POWER, LABEL_XP } from '../static/labels';
import { short } from '../util';
import Button from './Button';
import Loading from './Loading';

export default function CurrentResources() {
  // todo update in interval or through "requests"
  const { data, isValidating } = useSWR('/api/resources?id=' + devPlayerId, {
    refreshInterval: 20000,
  });
  console.log('CurrentResources', { data, id: devPlayerId });

  function reset() {
    return fetch('/api/resources/reset?id=' + devPlayerId);
  }

  const metal = short(data?.bank.metal);
  const gold = short(data?.bank.gold);
  const power = short(data?.bank.power);
  const xp = short(data?.bank.xp);

  return (
    <div className="card flex gap-4 align-center">
      {!data || (isValidating && <Loading />)}
      <h4>
        {LABEL_METAL} {metal}
      </h4>
      <h4>
        {LABEL_GOLD} {gold}
      </h4>
      <h4>
        {LABEL_POWER} {power}
      </h4>
      <h4>
        {LABEL_XP} {xp}
      </h4>
      <Button onClick={reset} text="D: Reset" />
    </div>
  );
}
