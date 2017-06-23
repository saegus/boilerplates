const Router = require('../utils/Router');

const Module1 = require('./module1');
const Module2 = require('./module2');

const handleMiddleware = middleware => async (req, res, next) => {
  try {
    const result = await middleware(req);
    if (result && result.error) res.status(result.status).send(result)
    else next();
  } catch (err) {
    console.error(err.stack);
    res.sendStatus(500);
  }
};

const middlewareModule1 = async req => console.log('Going to module 1 with params', req.params);
const middlewareModule2 = async req => console.log('Going to module 2 with params', req.params);

module.exports = express => {
  express.use('/module1', handleMiddleware(middlewareModule1), Router(Module1));
  express.use('/module2', handleMiddleware(middlewareModule2), Router(Module2));
};
