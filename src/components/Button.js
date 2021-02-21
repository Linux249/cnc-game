export default function Button({ onClick, text, children }) {
  return (
    <button className="" onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
