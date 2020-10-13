const bcrypt = require('bcryptjs')
const Promise = require('bluebird')

const { SALT_ROUND } = require('../config') 

module.exports.enCrypt = info => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUND, (err, salt) => {
      if(err) {
        reject(err)
      } else {
        bcrypt.hash(info, salt, (err, hash) => {
          if(err) {
            reject(err)
          } else {
            resolve(hash)
          }
        })
      }
    })
  })
}

module.exports.checkInfo = (info, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(info, hash, (err, res) => {
      if(err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}