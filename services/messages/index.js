const _query = require('../../db');

// Delete old messages
setInterval(() => {
  _query("DELETE FROM message WHERE date < current_date::timestamp - interval '2 day'", [])
}, 3600000);

module.exports = {
  getMessages: async() => {
    const res = await _query('SELECT name, msg, sign FROM message ORDER BY "date"', [])
    .then(d => d)
    .catch(e=>{
      throw new Error(e);
    });
    return res;
  },
  sendMessage: async(name, message, signature) => {
    const res = await _query(
      'INSERT INTO message (name, msg, sign) VALUES($1, $2, $3)',
      [name, message, signature])
    .then(d => {
      return { name, message, signature };
    })
    .catch(e => {
      throw new Error(e);
    });
    return res;
  }
}