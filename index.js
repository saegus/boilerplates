const Express = require('express');
const BodyParser = require('body-parser');
const Compression = require('compression');
const Path = require('path');
const { Server } = require('http');

const Routes = require('./src/routes');

const express = Express();
const server = Server(express);
const port = process.env.PORT || 3001;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Overwriting console methods to provide timestamps
const oldConsole = ['debug', 'log', 'info', 'warn', 'error']
  .reduce((obj, method) => Object.assign(obj, { [method]: console[method].bind({}) }));
const newConsole = ['debug', 'log', 'info', 'warn', 'error']
  .reduce((obj, method) => Object.assign(obj, {
    [method]: (...args) => oldConsole[method](`[${new Date().toISOString()}] [${method.toUpperCase()}]`, ...args)
  }));
Object.assign(console, newConsole);

// Express configuration
express.use(Compression());
express.use(BodyParser.json({ limit: '10mb' }));
express.use(BodyParser.urlencoded({ extended: false, limit: '10mb' }));

// Do not cache API results
express.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});

// Static files
// express.use(
//   Express.static(
//     Path.resolve(process.env.NODE_DIR || '.', 'public'),
//     process.env.NODE_ENV === 'production' ? { maxAge: 86400000 } : undefined,
//   ),
// );

// Sessions for user auth
// const ExpressSession = require('express-session');
// express.use(ExpressSession({
//   resave: false,
//   saveUninitialized: true,
//   secret: process.env.NODE_SECRET || 'marvin gaye',
// }));

// Import routes
Routes(express);

// Starting the server
console.log('Environment:', (process.env.NODE_ENV || 'dev').toUpperCase());
server.listen(port, () => console.log(`Server: Listening to http://localhost:${port}`));
