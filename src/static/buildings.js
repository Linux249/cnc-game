export const BUILDING_BASE = 0;
export const BUILDING_METAL = 1;
export const BUILDING_GOLD = 2;
export const BUILDING_POWER = 3;
export const BUILDING_ARMY = 4;
export const BUILDING_DEFENSE = 5;

export const BUILDING_BASE_ICON = '🎮';
export const BUILDING_METAL_ICON = '🏭';
export const BUILDING_GOLD_ICON = '⛏';
export const BUILDING_POWER_ICON = '💥';
export const BUILDING_ARMY_ICON = '⚔️';
export const BUILDING_DEFENS_ICON = '🛡';

export const BUILDINGS = [
  BUILDING_BASE,
  BUILDING_METAL,
  BUILDING_GOLD,
  BUILDING_POWER,
  BUILDING_ARMY,
  BUILDING_DEFENSE,
];

export const BUILDINGS_ICONS = [
  BUILDING_BASE_ICON,
  BUILDING_METAL_ICON,
  BUILDING_GOLD_ICON,
  BUILDING_POWER_ICON,
  BUILDING_ARMY_ICON,
  BUILDING_DEFENS_ICON,
];

export const BUILDINGS_COSTS = [
  BUILDING_BASE,
  BUILDING_METAL,
  BUILDING_GOLD,
  BUILDING_POWER,
  BUILDING_ARMY,
  BUILDING_DEFENSE,
];
// power cost are normal relative to this
export const POWER_COST_FACTOR = 4;
const SILO_BASE_COST = 100;
const BUILDING_BASE_COST_GROWTH = 1.25;

export function getBuildingCost(type, lvl) {
  return SILO_BASE_COST * BUILDING_BASE_COST_GROWTH ** lvl;
}

export function isProduction(type) {
  return type === BUILDING_METAL || type === BUILDING_GOLD || type === BUILDING_POWER;
}

// per hour
const METAL_BASE = 100;
const METAL_GROWTH = 1.2;
const GOLD_BASE = 10;
const GOLD_GROWTH = 1.2;
const POWER_BASE = METAL_BASE / 2;
const POWER_GROWTH = 1.2;

export function getBuildingProduction(type, lvl) {
  if (type === BUILDING_METAL) return METAL_BASE * METAL_GROWTH ** lvl;
  if (type === BUILDING_GOLD) return GOLD_BASE * GOLD_GROWTH ** lvl;
  if (type === BUILDING_POWER) return POWER_BASE * POWER_GROWTH ** lvl;
}
