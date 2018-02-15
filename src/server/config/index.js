export default {
  db: {
    url: process.env.DB_URL || 'mongodb://localhost:27017/red-tetris',
  },
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  localization: {
    timezone: process.env.TIMEZONE || 'Europe/Paris'
  },
  jwtKey: process.env.JWT_KEY || 'secret',
  expressSession: {
    secret: process.env.SESSION_SECRET || 'secret',
    name: process.env.SESSION_NAME || 'sessionId',
  }
};
