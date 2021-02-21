import useSWR from 'swr';
import { devPlayerId } from '../static';
import { LABEL_GOLD, LABEL_METAL, LABEL_POWER, LABEL_XP } from '../static/labels';
import Button from './Button';
import Loading from './Loading';


const short = v => v ? Math.floor(v * 100) / 100 : 0;

export default function CurrentResources() {
  // todo update in interval or through "requests"
  const { data, isValidating } = useSWR('/api/resources?id=' + devPlayerId, { refreshInterval: 20000 });
  console.log('CurrentResources', { data, id: devPlayerId });

  function reset() {
    return fetch('/api/resources/reset?id=' + devPlayerId);
  }

  const metal = short(data?.bank.metal);
  const gold = short(data?.bank.gold);
  const power = short(data?.bank.power);
  const xp = short(data?.bank.xp);

  return <div>
    {!data || isValidating && <Loading />}
    <p className='mt-1 text-xl'>{LABEL_METAL} {metal}</p>
    <p className=' text-xl'>{LABEL_GOLD} {gold}</p>
    <p className=' text-xl'>{LABEL_POWER} {power}</p>
    <p className=' text-xl'>{LABEL_XP} {xp}</p>
    <Button onClick={reset} text='Reset' />
  </div>;
}
