const users = [];

function usersJoin(id, username) {
  const user = { id, username };
  users.push(user);

  return user;
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  usersJoin,
  getUser,
};
