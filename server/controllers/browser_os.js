const Joi = require('joi')

const { os: OSModel, browser: BrowserModel } = require('../models')

class BrowserOSController {

  static async addRecord(ctx) {

    const checkRule = Joi.object({
      'user-agent': Joi.string().required()
    })
    const validator = Joi.validate(ctx.request.header, checkRule)

    if(validator) {
      const { 'user-agent': ua } = ctx.request.header
      const OSRegex = {
        windowsVersion: /Windows NT (\d+.\d+)/,
        osxVersion: /Mac OS X (\d+[_.]\d+[_.]\d+)/,
        iosVersion: /iPhone OS (\d+_\d+(?:_\d+)?)/,
        ipadVersion: /CPU OS (\d+_\d+(?:_\d+)?) like Mac OS X/,
        androidVersion: /Android (\d+.\d+(?:.\d+)?)/
      }
      const windowsMap = {
        '3.51': 'Windows NT 3.51',
        '4.0': 'Windows NT 4.0',
        '5.0': 'Windows 2000',
        '5.1': 'Windows XP',
        '5.2': 'Windows Server 2003',
        '6.0': 'Windows Vista',
        '6.1': 'Windows 7',
        '6.2': 'Windows 8.0',
        '6.3': 'Windows 8.1',
        '10.0': 'Windows 10'
      }
      let OSType
      if(OSRegex.windowsVersion.test(ua)) {
        OSType = windowsMap[ua.match(OSRegex.windowsVersion)[1]]
      } else if(OSRegex.osxVersion.test(ua)) {
        OSType = 'Mac OS X ' + ua.match(OSRegex.osxVersion)[1].replace('_', '.')
      } else if(OSRegex.iosVersion.test(ua)) {
        OSType = 'iOS ' + ua.match(OSRegex.iosVersion)[1].replace('_', '.')
      } else if(OSRegex.ipadVersion.test(ua)) {
        OSType = 'iPad OS ' + ua.match(OSRegex.ipadVersion)[1].replace('_', '.')
      } else if(OSRegex.androidVersion.test(ua)) {
        OSType = 'Android ' + ua.match(OSRegex.androidVersion)[1]
      } else {
        OSType = 'Other'
      }
      var data = await OSModel.findOrCreate({ where: { type: OSType } })
      if(data[1] === false) {
        data[0].count++
        await OSModel.update({ id: data[0].id, type: data[0].type, count: data[0].count }, { where: { id: data[0].id } })
      }

      let Browser
      if(ua.includes('MicroMessenger')) {
        Browser = '微信'
      } else if(ua.includes('UCBrowser') || ua.includes('UBrowser')) {
        Browser = 'UC浏览器'
      } else if(ua.includes('baiduboxapp')) {
        Browser = '手机百度'
      } else if(ua.includes('QQBrowser')) {
        Browser = 'QQ浏览器'
      } else if(ua.includes('QQ')) {
        Browser = 'QQ'
      } else if(ua.includes('The World')) {
        Browser = '世界之窗'
      } else if(ua.includes('LBBROWSER')) {
        Browser = '猎豹浏览器'
      } else if(ua.includes('SE 2.X MetaSr')) {
        Browser = '搜狗浏览器'
      } else if(ua.includes('Maxthon')) {
        Browser = '遨游浏览器'
      } else if(ua.includes('BIDUBrowser')) {
        Browser = '百度浏览器'
      } else if(ua.includes('Trident')) {
        Browser = 'Internet Explorer'
        const version = ua.match(/Trident\/(\d.0)/)[1]
        switch(version) {
          case '4.0': Browser += ' 8及以下'; break;
          case '5.0': Browser += ' 9'; break;
          case '6.0': Browser += ' 10'; break;
          case '7.0': Browser += ' 11'; break;
          default: break;
        }
      } else if(ua.includes('Edge')) {
        Browser = 'Microsoft Edge'
      } else if(ua.includes('OPR')) {
        Browser = 'Opera'
      } else if(ua.includes('Firefox')) {
        Browser = 'Mozilla Firefox'
      } else if(ua.includes('Chrome')) {
        Browser = 'Google Chrome'
      } else if(ua.includes('Safari')) {
        Browser = 'Apple Safari'
      } else {
        Browser = 'Other'
      }
      data = await BrowserModel.findOrCreate({ where: { type: Browser } })
      if(data[1] === false) {
        data[0].count++
        await BrowserModel.update({ id: data[0].id, type: data[0].type, count: data[0].count }, { where: { id: data[0].id } })
      }
    }

    ctx.status = 204

  }

  static async getOSList(ctx) {

    const data = await OSModel.findAndCountAll({
      attributes: ['type', 'count'],
      order: [['count', 'DESC']]
    })

    ctx.body = data

  }

  static async getBrowserList(ctx) {

    const data = await BrowserModel.findAndCountAll({
      attributes: ['type', 'count'],
      order: [['count', 'DESC']]
    })

    ctx.body = data

  }

}

module.exports = BrowserOSController