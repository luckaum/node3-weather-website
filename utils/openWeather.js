const tiny = require('tiny-json-http')

const openWeather = (local, callback) => {
    ;(async function _iife() {
      const urlCustom = 'http://api.openweathermap.org/data/2.5/weather?q=' + local + '&units=metric&appid=ca28b873728104fa964e2b7ef0e68bcf'
      try {
        const url = urlCustom
        const data = await tiny.get({url})
        callback(undefined,data)
  
      } catch (err) {
        callback('A valid city must be provided! Try another search!', undefined)
      }
    })();
  }

  module.exports = openWeather