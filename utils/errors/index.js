const BadRequestError = require('./bad-request-error');
const UnathorizedError = require('./unauthorized-error');
const ForbiddenError = require('./forbidden-error');
const NotFoundError = require('./not-found-error');
const ConflictError = require('./conflict-errror');
const InternalServerError = require('./internal-server-error');

module.exports = {
  BadRequestError,
  UnathorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
