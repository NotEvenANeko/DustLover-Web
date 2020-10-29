const path = require('path')
const fs = require('fs')
const Promise = require('bluebird')
const Bluebird = require('bluebird')

const uploadPath = path.resolve(__dirname, '../upload')
const avatarPath = path.resolve(__dirname, '../avatar')

/**
 * 
 * @param {fs.PathLike} filePath A path to a file or a directory
 * @returns {Bluebird<boolean | Error>}
 */
const findOrCreateFilePath = filePath => {
  return new Promise((resolve, reject) => {
    try {
      const exist = fs.existsSync(filePath)
      if(exist) {
        resolve(true)
      } else {
        fs.mkdir(filePath)
        console.log(`${filePath} Create Successfully`)
        resolve(true)
      }
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  uploadPath,
  avatarPath,
  findOrCreateFilePath
}