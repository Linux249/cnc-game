export default function Button({ onClick, text }) {

  return <button className='border' onClick={onClick}>{text}</button>;
}
