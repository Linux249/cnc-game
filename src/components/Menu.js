import useSWR from 'swr';
import Button from './Button';
import Char from './Char';

export default function Menu({ id, setID }) {
  const { data: players } = useSWR('/api/player');
  console.log(players);

  function select(i) {
    console.log('select', players[i]);
    setID(players[i].id);
  }

  return (
    <div className="card">
      <h1>Menu</h1>
      <h4>Current players</h4>
      {players?.map((p, i) => (
        <Button onClick={() => select(i)} text={p.id.slice(0, 6)} />
      ))}
      <br />
      <Button onClick={() => fetch('/api/player/create')} text="D: create" />
      <h4>select player</h4>
      {players?.map((p, i) => (
        <Button onClick={() => select(i)} text={p.id.slice(0, 6)} active={p.id === id} />
      ))}

      <h4>delete player</h4>
      {players?.map((p, i) => (
        <Button
          error
          onClick={() => fetch('/api/player/delete?id=' + p.id)}
          text={`Del: ${p.id.slice(0, 6)}`}
        />
      ))}
      <h4>selected player</h4>
      <p>{id}</p>
      {id && <Char id={id} />}
    </div>
  );
}
