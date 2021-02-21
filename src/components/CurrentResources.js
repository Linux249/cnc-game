import useSWR from 'swr';
import { LABEL_GOLD, LABEL_METAL, LABEL_XP } from '../static/labels';


const id = '2bb1c6e5-69ef-4971-bfd7-4feb4c2ff954';

export default function CurrentResources() {
  // todo update in interval or through "requests"
  const { data } = useSWR('/api/resources?id=' + id);
  console.log(data);
  return <div>
    <p className='mt-1 text-xl'>{LABEL_METAL} {data?.bank.metal}</p>
    <p className=' text-xl'>{LABEL_GOLD} {data?.bank.gold}</p>
    <p className=' text-xl'>{LABEL_XP} {data?.bank.xp}</p>
  </div>;
}
