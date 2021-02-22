export default function Button({ onClick, text, children, error = false, active = false }) {
  return (
    <button
      className={error ? 'bg-red-700' : active ? 'border border-4 bg-pink-500' : undefined}
      onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
