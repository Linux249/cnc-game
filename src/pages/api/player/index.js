import * as uuid from 'uuid';
import dynamoDb from '../../../lib/db';

async function handler(req, res) {
  console.log('/api/player', req.method);

  if (req.method === 'GET') {
    if (!req.query.id) {
      const { Items } = await dynamoDb.scan({});
      console.log(Items);
      return res.status(200).json(Items);
    } else {
      const { Item } = await dynamoDb.get({
        Key: {
          id: req.query.id,
        },
        ProjectionExpression: 'bank, prod, hero',
      });
      // console.log(Item);
      if (!Item) return res.status(403).json({ message: 'player not found' });
      return res.status(200).json(Item);
    }
  }

  // todo dont use, just an example
  if (req.method === 'POST') {
    const { Attributes } = await dynamoDb.update({
      Key: {
        id: req.body.id,
      },
      UpdateExpression: 'SET content = :content',
      ExpressionAttributeValues: {
        ':content': req.body.content || null,
      },
      ReturnValues: 'ALL_NEW',
    });

    return res.status(200).json(Attributes);
  }
}

export default handler;
