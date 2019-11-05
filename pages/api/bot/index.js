const VkBot = require('node-vk-bot-api');

const bot = new VkBot({
  token: process.env.VK_TOKEN,
  confirmation: process.env.VK_CONFIRMATION,
});

export default (req, res) => {
  console.log('here', req.body.object.message);

  try {
    if (req.method === 'POST') {
      const { type, group_id } = req.body;
      if (type === 'confirmation' && group_id === 129982085) {
        res.status(200).send(process.env.VK_CONFIRMATION);
        return;
      }

      //   const { message } = req.body.object;
      //   const { from_id } = message;
      console.log('dsdssdsd');

      bot.sendMessage(91645893, 'Hello!');
    } else {
      console.log('req');
    }
  } catch (error) {
    console.log(error);
  }
};
