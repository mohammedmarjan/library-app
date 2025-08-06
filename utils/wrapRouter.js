// Import the asyncHandler utility that wraps async route handlers
const asyncHandler = require('./asyncHandler');
/**
 * Wraps all route handlers in a router with asyncHandler automatically,
 * so you don’t need to wrap each async function manually.
 *
 * Instead of writing:
 *    router.get('/', asyncHandler(async (req, res) => { ... }));
 *
 * You can simply write:
 *    const baseRouter = express.Router();
 *    const router = wrapRouter(baseRouter);
 *    router.get('/', async (req, res) => { ... });
 *
 * All async errors will be properly caught and forwarded to the error handler.
 */

function wrapRouter(router) {
  // Define all the HTTP methods that need to be wrapped
  const methods = ['get', 'post', 'put', 'delete', 'patch'];

  // For each method (e.g., router.get, router.post, etc.)
  methods.forEach((method) => {
    // Save the original method implementation (e.g., router.get)
    const original = router[method];

    // Override the method with our own version
    router[method] = function (path, ...handlers) {
      // Wrap every handler using asyncHandler to catch async errors
      const wrappedHandlers = handlers.map((h) => asyncHandler(h));

      // Call the original router method with the same path and the wrapped handlers
      return original.call(this, path, ...wrappedHandlers);
    };
  });

  // Return the modified router with all methods wrapped
  return router;
}

module.exports = wrapRouter;
