/*
  A wrapper for Express routes that automatically catches errors and
  sends 500 HTTP statuses.
  
  Usage:
    const routes = [
      {
        description: 'Gets information about the connected user',
        method: 'GET',
        pattern: '/',
        middlewares: [AuthMiddleware],
        controller: (req, res) =>
          getUser(req)
          .then(result => (result.error ? res.status(403).send(result) : res.json(result))),
      },
      {
        description: 'Signs an user up for further validation by an administrator',
        method: 'POST',
        pattern: '/',
        middlewares: [ValidateMiddleware],
        controller: (req, res) =>
          postUser(req)
          .then(result => res.json(result)),
      },
      {
        description: 'Authenticates an user',
        method: 'POST',
        pattern: '/auth',
        controller: (req, res) =>
          authUser(req)
          .then(result => (result.error ? res.status(403).send(result) : res.json(result))),
      },
    ];
    express.use('/api/v2/user', Router(routes));
*/

const { Router } = require('express');

// Catches unhandled rejected Promises
const catchErrors = handler =>
  (req, res, next) =>
    Promise.resolve(handler(req, res, next))
    .catch((err) => {
      console.error(err.stack);
      res.sendStatus(500);
    })
;

const handleMiddleware = middleware =>
  (req, res, next) =>
    Promise.resolve(middleware(req))
    .then(result => (result.error ? res.status(result.status).send(result) : next()))
    .catch((err) => {
      console.error(err.stack);
      res.sendStatus(500);
    })
;

module.exports = routes => {
  const router = Router();
  routes.forEach((route) => {
    ['description', 'method', 'pattern', 'controller'].forEach((field) => {
      if (!route[field]) throw new Error(`Routes must have a ${field} (route.${field})`);
    });
    router[route.method.toLowerCase()](
      route.pattern,
      ...(route.middlewares || []).map(handleMiddleware),
      catchErrors(route.controller),
    );
  });
  return router;
}
