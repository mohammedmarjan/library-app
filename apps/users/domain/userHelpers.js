const { ROLES } = require('../../shared/constants');

function assertNotSuperAdmin(role, action) {
  if (role === ROLES.SUPER_ADMIN) {
    throw new Error(`Cannot ${action} with SUPER_ADMIN role via API`);
  }
}

module.exports = {
  assertNotSuperAdmin,
};
