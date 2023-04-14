///File nay cau hinh cac role
const allRoles = {
  user: ['manageHomes','createHomes'],
  admin: ['getUsers', 'manageUsers','manageHomes','createHomes'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
