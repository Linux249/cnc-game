import { generateCard } from '../../../static/army';

export default function newCard(req, res) {
  const lvl = 12; // random dev lvl
  res.status(200).json(generateCard(lvl));
}
