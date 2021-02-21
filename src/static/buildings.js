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
