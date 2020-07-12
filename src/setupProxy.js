const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://jobs.github.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};