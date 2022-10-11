const express = require('express')
const router = express.Router()

const Messages = require('./messages');

router.get('/messages', async(req, res) => {
  const messages = await Messages.getMessages()
  .then(d => d)
  .catch(e => {
    console.error(e);
    res.status(500).send();
  });
  // formatting data
  const data = messages.map(m => {return {'name':m[0], 'message': m[1], 'signature': m[2]}});
  res.status(200).json({data})
});

router.post('/messages', async(req, res) => {
  const {name, message, signature} = req.body;
  if (!name || !message || !signature) {
    res.status(400).json({message: 'Bad request!'});
    return;
  }
  //validation
  const name_pattern = /^\w{1,15}$/g
  if (!name_pattern.exec(name)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }
  const msg_pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/g
  if (!msg_pattern.exec(message)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }
  const sign_pattern = /^[a-f0-9]{64}/g
  if (!sign_pattern.exec(signature)) {
    res.status(400).json({message: 'Invalid input.'});
    return;
  }

  await Messages.sendMessage(name, message, signature)
  .then(d => res.status(200).json(d))
  .catch(e => {
    console.error(e);
    res.status(500).send();
  })
})

module.exports = router