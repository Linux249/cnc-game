import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { LABEL_GOLD, LABEL_METAL, LABEL_XP } from '../static/labels';
import { short } from '../util';
import Button from './Button';
import Card from './Card';

function Attack({ card: Original_card, id }) {
  const [result, setResult] = useState(null);
  console.log({ result });

  async function attack() {
    const data = await fetch('/api/army/attack?id=' + id).then(r => r.json());
    console.log(data);
    setResult(data);
  }

  return (
    <div>
      <div className="card ml-4">
        <Button onClick={attack}>attack</Button>
        {result && (
          <>
            <h4>result</h4>
            <Card card={result.card} />
            <h6>scrore: {short(result.score * 100) / 100}</h6>
            <div>
              <p className="mt-1 text-xl">
                {LABEL_METAL} {short(result.card.resources.metal * result.score)}
              </p>
              <p className=" text-xl">
                {LABEL_GOLD} {short(result.card.resources.gold * result.score)}
              </p>
              <p className=" text-xl">
                {LABEL_XP} {short(result.card.resources.xp * result.score)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Selected({ card: Original_card, id }) {
  const { data: card, isValidating } = useSWR('/api/army/card');
  console.log({ card });

  return (
    <div>
      <div className="card ml-4">
        <h4>selected</h4>
        {isValidating && <div>isValidating</div>}
        <Card card={card} />
        <Attack id={id} />
        <Button onClick={() => mutate('/api/army/card')}>shuffle</Button>
      </div>
    </div>
  );
}

export default function Army({ id }) {
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
        {selected && <Selected card={selected} id={id} />}
      </div>
    </>
  );
}
