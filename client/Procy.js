const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://rich-pear-puffer-tux.cyclic.app',
      changeOrigin: true,
    })
  );
};
