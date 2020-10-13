const path = require('path')
const fs = require('fs')

const uploadPath = path.resolve(__dirname, '../upload')
const avatarPath = path.resolve(__dirname, '../avatar')

const findOrCreateFilePath = (filePath) => {
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