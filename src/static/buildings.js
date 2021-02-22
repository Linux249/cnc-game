export const BUILDING_BASE = 0;
export const BUILDING_ARMY = 1;
export const BUILDING_DEFENSE = 2;
export const BUILDING_METAL = 3;
export const BUILDING_GOLD = 4;
export const BUILDING_POWER = 5;

export const BUILDING_BASE_ICON = '🎮';
export const BUILDING_ARMY_ICON = '⚔️';
export const BUILDING_DEFENS_ICON = '🛡';
export const BUILDING_METAL_ICON = '🏭';
export const BUILDING_GOLD_ICON = '⛏';
export const BUILDING_POWER_ICON = '⚡️';

export const BUILDINGS = [
  BUILDING_BASE,
  BUILDING_ARMY,
  BUILDING_DEFENSE,
  BUILDING_METAL,
  BUILDING_GOLD,
  BUILDING_POWER,
];

export const BUILDINGS_STRING = {
  [BUILDING_BASE]: 'lvl',
  [BUILDING_ARMY]: 'army',
  [BUILDING_DEFENSE]: 'defense',
  [BUILDING_METAL]: 'metal',
  [BUILDING_GOLD]: 'gold',
  [BUILDING_POWER]: 'power',
};

export const BUILDINGS_ICONS = [
  BUILDING_BASE_ICON,
  BUILDING_ARMY_ICON,
  BUILDING_DEFENS_ICON,
  BUILDING_METAL_ICON,
  BUILDING_GOLD_ICON,
  BUILDING_POWER_ICON,
];

export const BUILDINGS_COSTS = [
  BUILDING_BASE,
  BUILDING_ARMY,
  BUILDING_DEFENSE,
  BUILDING_METAL,
  BUILDING_GOLD,
  BUILDING_POWER,
];
// power cost are normal relative to this
export const POWER_COST_FACTOR = 4;
const SILO_BASE_COST = 100;
const BUILDING_BASE_COST_GROWTH = 1.25;

export function getBuildingCost(type, lvl) {
  return SILO_BASE_COST * BUILDING_BASE_COST_GROWTH ** lvl;
}

export function isProduction(type) {
  console.log('isProduction', type);
  return +type === BUILDING_METAL || +type === BUILDING_GOLD || +type === BUILDING_POWER;
}

// per hour
const METAL_BASE = 100;
const METAL_GROWTH = 1.2;
const GOLD_BASE = 10;
const GOLD_GROWTH = 1.2;
const POWER_BASE = METAL_BASE / 2;
const POWER_GROWTH = 1.2;

/**
 * returns the current production of an building
 * @param type
 * @param lvl
 * @returns {number}
 */
export function getBuildingProduction(type, lvl) {
  if (+type === BUILDING_METAL) return METAL_BASE * METAL_GROWTH ** lvl;
  if (+type === BUILDING_GOLD) return GOLD_BASE * GOLD_GROWTH ** lvl;
  if (+type === BUILDING_POWER) return POWER_BASE * POWER_GROWTH ** lvl;
  return 0;
}

/**
 * Returns the cost a player had for building this building
 * - first lvl is free
 * @param type type of building
 * @param lvl current level of building
 * @returns {number[]}
 */
export function totalBuildingCost(type, lvl) {
  let metal = 0;
  let power = 0;
  for (let i = 1; i < lvl; i++) {
    const cost = getBuildingCost(type, i);
    metal += cost;
    power += cost / POWER_COST_FACTOR;
  }

  return [metal, power];
}
