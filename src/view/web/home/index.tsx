import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import { useStyles } from './styles'

const Home = () => {

  const classes = useStyles()
  const formatStr = 'YYYY.MM.DD HH:mm:ss'

  const [time, setTime] = useState<string>(dayjs().format(formatStr))
  const [os, setOS] = useState<string | null>(null)
  const [client, setClient] = useState<string | null>(null)

  const getOS = () => {
    var usrAg = navigator.userAgent
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
    const regex = {
      windowsVersion: 'Windows NT (\\d+.\\d+)',
      osxVersion: 'Mac OS X (\\d+[_.]\\d+[_.]\\d+)',
      iosVersion: 'iPhone OS (\\d+_\\d+(?:_\\d+)?)',
      ipadVersion: 'CPU OS (\\d+_\\d+(?:_\\d+)?) like Mac OS X',
      androidVersion: 'Android (\\d+.\\d+(?:.\\d+)?)'
    }
    if(usrAg === undefined) {
      setOS('unknown')
    }
    else if(usrAg.indexOf('Macintosh') > -1) {
      setOS('Mac OS X')
      let version = usrAg.match(regex.osxVersion)
      if(version != null) {
        setOS('Mac OS X ' + version[1].replace(/_/g, '.'))
      }
    }
    else if(usrAg.indexOf('Windows NT') > -1) {
      setOS('Windows')
      let version = usrAg.match(regex.windowsVersion)
      if(version != null) {
        setOS((windowsMap as LooseObj)[version[1]])
      }
    }
    else if(usrAg.indexOf('iPhone') > -1) {
      setOS('iOS')
      let version = usrAg.match(regex.iosVersion)
      if(version != null) {
        setOS('iOS ' + version[1].replace(/_/g, '.'))
      }
    }
    else if(usrAg.indexOf('iPad') > -1) {
      setOS('iPad OS')
      let version = usrAg.match(regex.ipadVersion)
      if(version != null) {
        setOS('iPad OS ' + version[1].replace(/_/g, '.'))
      }
    } else if(usrAg.indexOf('Android') > -1) {
      setOS('Android')
      let version = usrAg.match(regex.androidVersion)
      if(version != null) {
        setOS('Android ' + version[1])
      }
    }
    else if(usrAg.indexOf('Linux') > -1) {
      setOS('Linux')
    }
    else {
      setOS('Other')
    }
  }

  const getClient = () => {
    var usrAg = navigator.userAgent
    if(usrAg === undefined) {
      setClient('unknown')
    }
    else if(usrAg.indexOf('Firefox') > -1) {
      setClient('Mozilla Firefox')
    }
    else if(usrAg.indexOf('Opera') > -1 || usrAg.indexOf('OPR') > -1) {
      setClient('Opera')
    }
    else if(usrAg.indexOf('Trident') > -1) {
      setClient('Microsoft Internet Explorer')
    }
    else if(usrAg.indexOf('Edge') > -1) {
      setClient('Microsoft Edge')
    }
    else if(usrAg.indexOf('Chrome') > -1) {
      setClient('Google Chrome or Chromium')
    }
    else if(usrAg.indexOf('Safari') > -1) {
      setClient('Apple Safari')
    }
    else if(usrAg.indexOf('TencentTraveler') > -1) {
      setClient('QQ Browser')
    }
    else if(usrAg.indexOf('360SE') > -1) {
      setClient('360 Browser')
    }
    else {
      setClient('Other')
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setTime(dayjs().format(formatStr))
    }, 500)
    getOS()
    getClient()
    return () => clearInterval(id)
  }, [])

  return (
    <div className={classes.homePage}>
      <h1>猫猫的主页</h1>
      <p>V2.0开发中……</p>
      <p>当前时间:{time}</p>
      <p>你的系统是:{os}</p>
      <p>你的浏览器是:{client}</p>
      <a href="https://github.com/Cattttttttt">
        <img src="https://img.shields.io/badge/Github-FragileNeko-ff69b4?logo=github" alt="alternate_text" />
      </a>
    </div>
  )
}

export default Home