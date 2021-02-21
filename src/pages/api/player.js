import * as uuid from 'uuid';
import dynamoDb from '../../lib/db';


async function handler(req, res) {
  console.log('/api/player', req.method);
  if (req.method === 'PUT') {
    const player = {
      id: uuid.v4(),
      prod: {
        metal: 100,
        gold: 30,
        power: 40,
      },
      bank: {
        metal: 1000,
        gold: 300,
        power: 400,
        lastUpdated: Date.now(),
      },
      since: 0,
      createdAt: Date.now(),
    };

    await dynamoDb.put({
      Item: player,
    });

    res.status(201).json(player);
  }

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
        ProjectionExpression: 'bank, prod',
      });
      console.log(Item);
      if (!Item) return res.status(403).json({ message: 'player not found' });
      return res.status(200).json(Item);
    }

  }

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

  if (req.method === 'DELETE') {
    await dynamoDb.delete({
      Key: {
        id: req.query.id,
      },
    });

    return res.status(204).json({});
  }
}

export default handler;
