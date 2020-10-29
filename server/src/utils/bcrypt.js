const bcrypt = require('bcryptjs')
const Bluebird = require('bluebird')
const Promise = require('bluebird')

const { SALT_ROUND } = require('../config') 

/**
 * 
 * @param {string} info The info which is going to be encrypted
 * @returns {Bluebird<string | Error>}
 */
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

/**
 * 
 * @param {string} info Input info
 * @param {string} hash Encrypted info
 * @returns {Bluebird<string | Error>}
 */
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