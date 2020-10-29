module.exports = {
  DATABASE: {
    DIALECT: 'sqlite',
    PATH: __dirname + '/../../db.sqlite3'
  },
  SALT_ROUND: 10,
  TOKEN: {
    ACCESS_SECRET: "m6h9teapcm7fd1d5r1fo216l7e96xtwi",
    REFRESH_SECRET: "4ofrvr69qyh07nsx3q6adgd8atoaqq6f",
    ACCESS_TIME: 60,
    REFRESH_TIME: '3d'
  },
  PREVIEW_LENGTH: {
    QUESTION: 100,
    ANSWER: 50
  }
}