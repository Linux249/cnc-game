import dynamoDb from '../../../lib/db';
import {
  BUILDINGS_STRING,
  getBuildingCost,
  getBuildingProduction,
  isProduction,
  POWER_COST_FACTOR,
  totalBuildingCost,
} from '../../../static/buildings';

const BUILDING_MAX_LEVEL = 50;

/**
 * conditions:
 *   - id of player
 *   - p for position/slot
 *   - id type: create
 *   - if building exist -> lvl up
 *   -
 * @param req
 * @param res
 * @returns {Promise<any>}
 */
async function upgradeBuilding(req, res) {
  // calc costs for this building
  const { p, type, id } = req.query;
  console.log({ p, type, id });
  if (!p || !id) return res.status(406).json({ message: 'missing param id or p' });
  const { Item } = await dynamoDb.get({
    Key: {
      id: id,
    },
    ProjectionExpression: `buildings[${p}]`,
  });

  if (!Item) return res.status(406).json({ message: 'missing param id or p' });
  let building = Item.buildings[0];
  console.log('building:', building, type);
  // Defaults
  let UpdateExpression = '';
  const ExpressionAttributeValues = {};
  if (type) {
    if (type === '-1' && building) {
      // -1 = delete,
      // todo give resources back on delete
      UpdateExpression += `SET buildings[${p}] = :bu`;
      ExpressionAttributeValues[':bu'] = null;

      // reset recourses
      const [metal, power] = totalBuildingCost(building.type, building.lvl);
      console.log('delete building: ', metal, power);
      UpdateExpression += ` ADD bank.metal :m, bank.power :p`;
      ExpressionAttributeValues[':m'] = metal;
      ExpressionAttributeValues[':p'] = power;
      // todo update production
      if (isProduction(building.type)) {
        let prod = 0;
        for (let i = 1; i <= building.lvl; i++) {
          prod += getBuildingProduction(building.type, building.lvl);
        }
        UpdateExpression += `, prod.${BUILDINGS_STRING[building.type]} :p`;
        ExpressionAttributeValues[':p'] = -prod;
      }
    } else {
      // else create building
      console.log('create building');
      UpdateExpression += `SET buildings[${p}] = :bu`;
      ExpressionAttributeValues[':bu'] = {
        type,
        lvl: 1,
      };
      // todo update production
      if (isProduction(type)) {
        const prod = getBuildingProduction(type, 1);
        UpdateExpression += ` Add prod.${BUILDINGS_STRING[type]} :p`;
        ExpressionAttributeValues[':p'] = prod;
      } else {
        UpdateExpression += `, hero.${BUILDINGS_STRING[type]} = :h`;
        ExpressionAttributeValues[':h'] = 1;
      }
    }
  } else if (building && building.lvl < BUILDING_MAX_LEVEL) {
    // increase level
    console.log('increase lvl');
    const cost = getBuildingCost(building.type, building.lvl);
    // reduce costs from bank
    UpdateExpression += `ADD buildings[${p}].lvl :l, bank.metal :m, bank.power :p`;
    ExpressionAttributeValues[':l'] = 1;
    ExpressionAttributeValues[':m'] = -cost;
    ExpressionAttributeValues[':p'] = -cost / POWER_COST_FACTOR;
    // todo update production
    if (isProduction(building.type)) {
      const prod = getBuildingProduction(building.type, building.lvl + 1);
      UpdateExpression += ` SET prod.${BUILDINGS_STRING[building.type]} = :prod`;
      ExpressionAttributeValues[':prod'] = prod;
    } else {
      UpdateExpression += `, hero.${BUILDINGS_STRING[building.type]} :h`;
      ExpressionAttributeValues[':h'] = 1;
    }
  }

  console.log(UpdateExpression, ExpressionAttributeValues);
  const { Attributes } = await dynamoDb.update({
    Key: {
      id: id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  });

  console.log(Attributes);
  // save base

  // todo check
  // trigger collect of production
  res.status(200).json(Attributes);
}

export default upgradeBuilding;
