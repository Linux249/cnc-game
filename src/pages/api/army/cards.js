import { generateCard } from '../../../static/army';

export default function getAllCard(req, res) {
  const lvl = 12; // random dev lvl
  res
    .status(200)
    .json([generateCard(lvl), generateCard(lvl), generateCard(lvl), generateCard(lvl)]);
}
