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
    ProjectionExpression: 'prod, bank.lastUpdated',
  });
  if (!Item) return res.status(403).json({ message: 'player not found' });
  console.log(Item);
  const { prod, bank } = Item;

  // calc ms since last update
  const now = Date.now();
  const hPast = (now - bank.lastUpdated) / 1000 / 60 / 60;
  console.log('time, passed (h, m, s)', hPast, hPast * 60, hPast * 60 * 60);

  // console.log({ newBank });

  const { Attributes } = await dynamoDb.update({
    Key: {
      id: id,
    },
    UpdateExpression: 'ADD bank.metal :m, bank.gold :g, bank.power :p SET bank.lastUpdated = :d',
    ExpressionAttributeValues: {
      ':m': prod.metal * hPast,
      ':g': prod.gold * hPast,
      ':p': prod.power * hPast,
      ':d': now,
    },
    ReturnValues: 'ALL_NEW',
  });

  // send new resources back to client
  console.timeEnd('get + update resources');
  return res.status(200).json(Attributes);
}

export default getCurrentResources;
