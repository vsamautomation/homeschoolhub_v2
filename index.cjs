'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@react-router/express');

function toPort(value, fallback) {
  const port = Number.parseInt(value ?? '', 10);
  return Number.isFinite(port) && port > 0 ? port : fallback;
}

const NODE_ENV = process.env.NODE_ENV || 'production';
const MODE =
  NODE_ENV === 'development' || NODE_ENV === 'test' ? NODE_ENV : 'production';
const PORT = toPort(process.env.PORT, 3000);
const HOST = process.env.HOST || '0.0.0.0';
const CLIENT_BUILD_DIR = path.join(__dirname, 'build', 'client');
process.env.NODE_ENV = NODE_ENV;

async function start() {
  // Only the server bundle is ESM — everything else is already require()'d above
  const build = await import('./build/server/index.js');

  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('combined'));

  // Hashed asset files — cache forever (immutable)
  app.use(
    '/assets',
    express.static(path.join(CLIENT_BUILD_DIR, 'assets'), {
      immutable: true,
      maxAge: '1y',
    })
  );

  // Everything else in build/client — short cache
  app.use(
    express.static(CLIENT_BUILD_DIR, { maxAge: '1h' })
  );

  // All remaining requests handled by React Router
  app.use(createRequestHandler({ build, mode: MODE }));

  app.listen(PORT, HOST, () => {
    console.log(
      `HomeschoolHub server running on ${HOST}:${PORT} (NODE_ENV=${NODE_ENV}, mode=${MODE})`
    );
  });
}

start().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
