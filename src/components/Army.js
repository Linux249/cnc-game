import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Button from './Button';
import Card from './Card';

function Selected({ card: Original_card }) {
  const { data: card, isValidating } = useSWR('/api/army/card');
  console.log({ card });
  return (
    <div>
      <div className="card ml-4">
        <h4>selected</h4>
        {isValidating && <div>isValidating</div>}
        <Card card={card} />
        <Button>attack</Button>
        <Button onClick={() => mutate('/api/army/card')}>shuffle</Button>
      </div>
    </div>
  );
}

export default function Army() {
  const { data: cards } = useSWR('/api/army/cards');
  const [selected, setSelected] = useState(null);
  console.log({ cards, selected });
  if (!cards) return <div>loading</div>;
  return (
    <>
      <div className="flex">
        <div className="card">
          <h2>Army</h2>
          <div className="flex flex-wrap items-center justify-around gap-2.5 mt-6">
            {cards.map(card => (
              <Card onClick={() => setSelected(card)} card={card} />
            ))}
          </div>
        </div>
        {selected && <Selected card={selected} />}
      </div>
    </>
  );
}
