// todo extract this to an extra function for using on upgrading build
import dynamoDb from '../../../lib/db';

async function getBuildings(req, res) {
  const { id } = req.query;
  console.log('getBuildings', id);
  if (!id) return res.status(406).json({ message: 'missing param id or p' });

  // get current recourses and time for last updating
  const { Item } = await dynamoDb.get({
    Key: {
      id: id,
    },
    ProjectionExpression: 'buildings',
  });
  if (!Item) return res.status(403).json({ message: 'player not found' });

  return res.status(200).json(Item.buildings);
}

export default getBuildings;
