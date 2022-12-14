import * as uuid from 'uuid';
import dynamoDb from '../../../lib/db';

const emptyBuilding = new Array(6).fill(null);

export default async function createPlayer(req, res) {
  console.log(req.method, '/api/player/create');
  const player = {
    id: uuid.v4(),
    buildings: emptyBuilding,
    prod: {
      metal: 0,
      gold: 0,
      power: 0,
    },
    bank: {
      metal: 1000,
      gold: 300,
      power: 400,
      lastUpdated: Date.now(),
    },
    hero: {
      lvl: 1,
      army: 1,
      defense: 1,
    },
    since: 0,
    createdAt: Date.now(),
  };

  await dynamoDb.put({
    Item: player,
  });

  res.status(201).json(player);
}
