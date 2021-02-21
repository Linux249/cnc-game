export default function collectResources(req, res) {
  // compare current time and last on (saved) and calc + update resources

  // todo connect to db
  res.status(200).json({
    bank: {
      metal: 100,
      gold: 50,
      xp: 400,
    },
  });
}
