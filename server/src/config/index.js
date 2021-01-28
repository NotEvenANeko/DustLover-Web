const dev = true

module.exports = {
  DATABASE: {
    DIALECT: 'sqlite',
    PATH: __dirname + (dev ? '/../../dev.sqlite3' : '/../../db.sqlite3')
  },
  SALT_ROUND: 10,
  TOKEN: {
    ACCESS_SECRET: "hahahah",
    REFRESH_SECRET: "hahahah",
    ACCESS_TIME: 60,
    REFRESH_TIME: '3d'
  },
  PREVIEW_LENGTH: {
    QUESTION: 100,
    ANSWER: 50
  },
  ABOUTME: 'd5e40ba1-1924-4931-b0a1-d79dd3458b2e'
}