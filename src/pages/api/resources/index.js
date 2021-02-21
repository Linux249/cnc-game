export default function getCurrentResources(req, res) {
  // todo connect to db
  res.status(200).json({
    bank: {
      metal: 100,
      gold: 50,
      xp: 400,
    },
  });
}
