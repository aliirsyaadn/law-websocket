const users = [];
const sendTask = require('./mq_task');

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  // Send to message queue
  sendTask(`[INSERT USER] ${username} into ${room}`);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const user = users.find((user) => user.id === id);
    sendTask(`[REMOVE USER] ${user.username} in ${user.room}`);
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
