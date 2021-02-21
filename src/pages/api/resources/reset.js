// todo extract this to an extra function for using on upgrading build
import dynamoDb from '../../../lib/db';


async function resetBankFromPlayer(req, res) {
  console.time('reset bank');
  const { id } = req.query;

  // calc extra recourse since last calc/update
  const newBank = {
    metal: 0,
    gold: 0,
    power: 0,
    lastUpdated: Date.now(),
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
  console.timeEnd('reset bank');
  return res.status(200).json(Attributes);

}

export default resetBankFromPlayer;
