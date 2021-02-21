// todo extract this to an extra function for using on upgrading build
export default function getCurrentResources(req, res) {
  // get current recourses and time for last updating
  const now = new Date();

  // calc ms since last update

  // calc extra recourse since last calc/update

  // update new recourse and update time for last saving

  // send new resources back to client

  // todo measures performance in live environment

  res.status(200).json({
    bank: {
      metal: 100,
      gold: 50,
      xp: 400,
    },
  });
}

