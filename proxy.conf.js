const PROXY_CONFIG = [{
  context: [
    "/api/**/**/*",
  ],
  target: "http://localhost:5000",
  secure: true,
}]

module.exports = PROXY_CONFIG;
