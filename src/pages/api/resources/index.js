// todo extract this to an extra function for using on upgrading build
import dynamoDb from '../../../lib/db';

async function getCurrentResources(req, res) {
  console.time('get + update resources');
  const { id } = req.query;
  console.log('getCurrentResources', id);
  // get current recourses and time for last updating
  const { Item } = await dynamoDb.get({
    Key: {
      id: id,
    },
    ProjectionExpression: 'bank, prod',
  });
  if (!Item) return res.status(403).json({ message: 'player not found' });

  const { prod, bank } = Item;

  // calc ms since last update
  const now = Date.now();
  const hPast = (now - bank.lastUpdated) / 1000 / 60 / 60;
  console.log('time, passed (h, m, s)', hPast, hPast * 60, hPast * 60 * 60);

  // calc extra recourse since last calc/update
  const newBank = {
    metal: prod.metal * hPast + bank.metal,
    gold: prod.gold * hPast + bank.gold,
    power: prod.power * hPast + bank.power,
    lastUpdated: now,
  };
  console.log({ newBank });

  const { Attributes } = await dynamoDb.update({
    Key: {
      id: id,
    },
    UpdateExpression: 'SET bank = :bank',
    ExpressionAttributeValues: {
      ':bank': newBank,
    },
    ReturnValues: 'ALL_NEW',
  });

  // send new resources back to client
  console.timeEnd('get + update resources');
  return res.status(200).json(Attributes);
}

export default getCurrentResources;
