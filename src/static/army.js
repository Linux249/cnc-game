const percentLvlOne = 1.2;

const ARMY_LEVEL_GROWTH = 1.24;

const ARMY_BASE_METAL = 100;
const ARMY_GROWTH_METAL = 1.2;
const ARMY_BASE_GOLD = 100;
const ARMY_GROWTH_GOLD = 1.2;
const ARMY_BASE_XP = 1000;
const ARMY_GROWTH_XP = 1.2;

export function getResources(lvl) {
  return {
    metal: ARMY_BASE_METAL * ARMY_GROWTH_METAL ** lvl,
    gold: ARMY_BASE_GOLD * ARMY_GROWTH_GOLD ** lvl,
    xp: ARMY_BASE_XP * ARMY_GROWTH_XP ** lvl,
  };
}

export function plusOne() {
  return Math.floor(Math.random() * percentLvlOne * 2 - percentLvlOne);
}

export function generateCard(lvl) {
  return {
    title: 'Camp',
    lvl: lvl + plusOne(),
    resources: getResources(lvl + plusOne()),
    attack: lvl + plusOne(),
    defense: lvl + plusOne(),
  };
}
