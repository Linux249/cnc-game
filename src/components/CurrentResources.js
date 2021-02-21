import useSWR from 'swr';
import { devPlayerId } from '../static';
import { LABEL_GOLD, LABEL_METAL, LABEL_POWER, LABEL_XP } from '../static/labels';
import Button from './Button';
import Loading from './Loading';


const id = devPlayerId;

export default function CurrentResources() {
  // todo update in interval or through "requests"
  const { data, isValidating } = useSWR('/api/resources?id=' + id, {refreshInterval: 20000});
  console.log({ data });

  function reset() {
    return fetch('/api/resources/reset?id=' + id);
  }
  const metal = Math.floor(data?.bank.metal)
  const gold = data?.bank.gold
  const power = data?.bank.power
  const xp = data?.bank.xp

  return <div>
    {!data || isValidating && <Loading />}
    <p className='mt-1 text-xl'>{LABEL_METAL} {metal}</p>
    <p className=' text-xl'>{LABEL_GOLD} {gold}</p>
    <p className=' text-xl'>{LABEL_POWER} {power}</p>
    <p className=' text-xl'>{LABEL_XP} {xp}</p>
    <Button onClick={reset} text='Reset' />
  </div>;
}
