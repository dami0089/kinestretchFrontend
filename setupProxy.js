const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://soa.afip.gob.ar/sr-padron/v2",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
