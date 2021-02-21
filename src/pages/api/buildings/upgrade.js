import dynamoDb from '../../../lib/db';


const BUILDING_MAX_LEVEL = 50;

async function upgradeBuilding(req, res) {
  // calc costs for this building
  const { p, type, id } = req.query;
  console.log({ p, type, id })
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
    // create building
    console.log('create building');
    buildings[p] = {
      type,
      lvl: 1,
    };
  } else if (buildings[p] && buildings[p].lvl < BUILDING_MAX_LEVEL) {
    // increase level
    console.log('increase level');
    buildings[p].lvl += 1;
  } else {
    // delete Building
    console.log('delete Building');
    buildings[p] = null;
  }
  const { Attributes } = await dynamoDb.update({
    Key: {
      id: id,
    },
    UpdateExpression: 'SET buildings = :buildings',
    ExpressionAttributeValues: {
      ':buildings': buildings,
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