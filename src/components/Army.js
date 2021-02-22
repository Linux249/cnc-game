import useSWR from 'swr';
import Card from './Card';

export default function Army() {
  const { data: cards } = useSWR('/api/army/cards');
  if (!cards) return <div>loading</div>;
  return (
    <div className="flex flex-wrap items-center justify-around gap-2.5 mt-6">
      {cards.map(card => (
        <Card card={card} />
      ))}
    </div>
  );
}
