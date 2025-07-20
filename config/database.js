const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DB_HOST', '127.0.0.1'),
      port: env.int('DB_PORT', 5432),
      database: env('DB_NAME', 'zenithus'),
      user: env('DB_USER', 'postgres'),
      password: env('DB_PASSWORD', 'yourStrongPassword'),
      ssl: env.bool('DB_SSL', false),
    },
    pool: { min: 2, max: 10 },
  },
});
