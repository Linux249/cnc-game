import dynamoDb from '../../../lib/db';

export default async function deletePlayer(req, res) {
  const r = await dynamoDb.delete({
    Key: {
      id: req.query.id,
    },
  });

  return res.status(204).json(r);
}
