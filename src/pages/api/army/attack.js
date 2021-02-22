import { generateCard } from '../../../static/army';

const ARMY_ATTACK_BASE = 100;
const ARMY_ATTACK_GROWTH = 1.12;
const ARMY_LIVE_BASE = 100;

const DEFENSE_ATTACK_BASE = 100;
const DEFENSE_ATTACK_GROWTH = 1.12;
const DFENSE_LIVE_BASE = 100;

export default function attackCard(req, res) {
  const lvl = 12; // random dev lvl
  const playerArmyLevel = 13;
  const boniFromCardAttack = 1.32; // 3.2 in card
  const boniFromCardLive = 1.12; // 3.2 in card
  const defenseAttackBoni = Math.random() / 5 + 1; // +20% boni max  => 1.2

  const card = generateCard(lvl);
  const attack = ARMY_ATTACK_BASE * ARMY_ATTACK_GROWTH ** playerArmyLevel * boniFromCardAttack;
  const defenseAttack = DEFENSE_ATTACK_BASE * DEFENSE_ATTACK_GROWTH ** card.lvl * defenseAttackBoni;

  res.status(200).json({ attack, defenseAttack });
}
