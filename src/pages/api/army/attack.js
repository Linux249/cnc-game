import dynamoDb from '../../../lib/db';
import { generateCard } from '../../../static/army';

const ARMY_ATTACK_BASE = 100;
const ARMY_ATTACK_GROWTH = 1.12;
const ARMY_LIVE_BASE = 100;

const DEFENSE_ATTACK_BASE = 100;
const DEFENSE_ATTACK_GROWTH = 1.12;
const DFENSE_LIVE_BASE = 100;

export default async function attackCard(req, res) {
  const { id } = req.query;
  console.log('attackCard', id);
  if (!id) return res.status(406).json({ message: 'missing param id' });

  // get current recourses and time for last updating
  const { Item } = await dynamoDb.get({
    Key: {
      id: id,
    },
    ProjectionExpression: 'hero.lvl, hero.army',
  });
  if (!Item) return res.status(403).json({ message: 'player not found' });

  const lvl = Item.hero.lvl; // random dev lvl
  const playerArmyLevel = Item.hero.army;
  const boniFromCardAttack = 1.32; // 3.2 in card
  const boniFromCardLive = 1.12; // 3.2 in card
  const defenseAttackBoni = Math.random() / 5 + 1; // +20% boni max  => 1.2
  console.log(lvl, playerArmyLevel);
  const card = generateCard(lvl);
  const attack = ARMY_ATTACK_BASE * ARMY_ATTACK_GROWTH ** playerArmyLevel * boniFromCardAttack;
  const defenseAttack = DEFENSE_ATTACK_BASE * DEFENSE_ATTACK_GROWTH ** card.lvl * defenseAttackBoni;

  const score = (attack / defenseAttack / ((attack + defenseAttack) / 2)) * 100;
  res.status(200).json({
    attack,
    defenseAttack,
    score,
    card,
  });
}
