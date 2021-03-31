const moment = require('moment');
const sendTask = require('./mq_task');

function formatMessage(username, text) {
  const time = moment().format('h:mm a');
  if (username !== 'Admin') {
    sendTask(`[INSERT MESSAGE] ${username}: ${text} | ${time}`);
  }
  return {
    username,
    text,
    time,
  };
}

module.exports = formatMessage;
