import useSWR from 'swr/esm';
import { LABEL_GOLD, LABEL_METAL, LABEL_XP } from '../static/labels';


export default function CurrentResources() {
  // todo update in interval or through "requests"
  const { data } = useSWR('/api/resources?id=399011e1-408f-46e5-bfc1-2068b43f2c0c');
  return <div>
    <p className='mt-1 text-xl'>{LABEL_METAL} {data?.bank.metal}</p>
    <p className=' text-xl'>{LABEL_GOLD} {data?.bank.gold}</p>
    <p className=' text-xl'>{LABEL_XP} {data?.bank.xp}</p>
  </div>;
}
