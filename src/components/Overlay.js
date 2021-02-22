import { useState } from 'react';

export default function Overlay() {
  const [open, setOpen] = useState(false);
  function close() {
    console.log('close');
    setOpen(false);
  }

  if (open)
    return (
      <div onClick={close} className="overlay-container bg-gradient-to-r from-blue-500">
        <div className="w-40 h-60 bg-pink-500 transition duration-300 ease-in-out"></div>
      </div>
    );
  return <button onClick={() => setOpen(true)}>open</button>;
}
