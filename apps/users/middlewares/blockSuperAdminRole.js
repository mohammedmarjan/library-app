const { assertNotSuperAdmin } = require('../domain/userHelpers');

function blockSuperAdminRoleOnCreate(req, res, next) {
  try {
    assertNotSuperAdmin(req.body.role, 'create a user');
    next();
  } catch (err) {
    next(err);
  }
}

function blockSuperAdminRoleOnUpdate(req, res, next) {
  try {
    assertNotSuperAdmin(req.body.role, 'assign a role');
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  blockSuperAdminRoleOnCreate,
  blockSuperAdminRoleOnUpdate,
};
