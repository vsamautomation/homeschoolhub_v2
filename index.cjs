'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@react-router/express');

const PORT = process.env.PORT || 3010;
const CLIENT_BUILD_DIR = path.join(__dirname, 'build', 'client');

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
  app.use(createRequestHandler({ build, mode: 'production' }));

  app.listen(PORT, () => {
    console.log(`HomeschoolHub server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
