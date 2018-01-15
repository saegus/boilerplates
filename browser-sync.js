const fallback = require('connect-history-api-fallback');

module.exports = {
  host: "localhost",
  port: 8080,
  server: { baseDir: ["dist"] },
  // Internally redirect routes to /
  middleware: [fallback()],
  files: [
    "dist/**/*",
    "!dist/*.map"
  ]
};
