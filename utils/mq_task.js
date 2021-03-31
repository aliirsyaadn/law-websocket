function sendTask(msg) {
  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      var queue = 'task_queue';

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log(msg);
    });
    setTimeout(function () {
      connection.close();
    }, 500);
  });
}

module.exports = sendTask;
