'use strict';

const PORT = process.env.PORT || 3000;

async function start() {
  const { default: path }            = await import('path');
  const { default: express }         = await import('express');
  const { createRequestHandler }     = await import('@react-router/express');

  const CLIENT_BUILD_DIR = path.join(process.cwd(), 'build', 'client');

  // Pre-load the ESM server bundle — fails fast if the build is missing
  const build = await import('./build/server/index.js');

  const app = express();
  app.disable('x-powered-by');

  // Hashed asset files — cache forever (immutable)
  app.use(
    '/assets',
    express.static(path.join(CLIENT_BUILD_DIR, 'assets'), {
      immutable: true,
      maxAge:    '1y',
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
