router.post('/hide', async (req, res) => {
  console.log('here');
  debugger;
  const { id } = req.body;
  console.log(id);

  try {
    await Event.update(
      { id: id },
      {
        status: 'hidden',
      },
      { upsert: true }
    );

    res.send('ok');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
