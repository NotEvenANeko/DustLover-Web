module.exports = {
  DATABASE: {
    DIALECT: 'sqlite',
    PATH: __dirname + '/../../db.sqlite3'
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
  }
}