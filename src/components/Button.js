export default function Button({ onClick, text, children, error = false }) {
  return (
    <button className={error ? 'bg-red-700' : undefined} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
