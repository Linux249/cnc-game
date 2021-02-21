import dynamoDb from '../../../lib/db';
import { getBuildingCost, POWER_COST_FACTOR } from '../../../static/buildings';

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
    ProjectionExpression: 'buildings, bank',
  });

  console.log(Item);
  if (!Item) return res.status(406).json({ message: 'missing param id or p' });
  const { buildings, bank } = Item;
  if (type) {
    if (type === '-1') {
      // -1 = delete,
      // todo give resources back on delete
      buildings[p] = null;
    } else {
      // else create building
      console.log('create building');
      buildings[p] = {
        type,
        lvl: 1,
      };
    }
  } else if (buildings[p] && buildings[p].lvl < BUILDING_MAX_LEVEL) {
    // increase level
    console.log('increase level');
    const cost = getBuildingCost(buildings[p].type, buildings[p].lvl);
    buildings[p].lvl += 1;
    bank.metal -= cost;
    bank.power -= cost / POWER_COST_FACTOR;
    // reduce costs from bank
  }

  const { Attributes } = await dynamoDb.update({
    Key: {
      id: id,
    },
    UpdateExpression: 'SET buildings = :bu, bank = :ba',
    ExpressionAttributeValues: {
      ':bu': buildings,
      ':ba': bank,
    },
    ReturnValues: 'ALL_NEW',
  });

  console.log(Attributes);
  // save base

  // todo check
  // trigger collect of production
  res.status(200).json(Attributes);
}

export default upgradeBuilding;
