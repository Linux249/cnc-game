import { useEffect, useState } from 'react';

export default function Timer() {
  // save the current timer intervall, can increase ticks
  const [interv, setInterv] = useState(1000);
  const [ticks, setTicks] = useState(0);

  // request the todos on each tick
  function tick() {
    console.log('tick', ticks);
    setTicks(t => t + 1);
  }

  useEffect(() => {
    const t = setInterval(tick, interv);
    // start timer
    return () => clearInterval(t);
  }, []);

  return (
    <div className="card">
      <h1>
        Timer: {Math.round(interv / 1000)}s Ticks: {ticks}
      </h1>
    </div>
  );
}
