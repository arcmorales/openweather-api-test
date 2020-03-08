'use strict'

import CONSTANTS from '../constants'

import chai from 'chai'
import chaiHttp from 'chai-http'
import moment from 'moment'

require('dotenv').config()
const expect = require('chai').expect

chai.use(chaiHttp)

let sydneyWeather

describe('Getting weather forecast for Sydney', () => {
  before('User looks up the weather forecast for Sydney', (done) => {
    const { BASEURL, QUERY, SYDNEY_ID } = CONSTANTS
    chai.request(BASEURL)
      .get(QUERY)
      .query({ appid: process.env.API_KEY, id: SYDNEY_ID })
      .end((_error, response) => {
        sydneyWeather = response
        done()
      })
  })

  it('should be able to successfully retrieve the weather forecast for Sydney, Australia', () => {
    expect(sydneyWeather).to.have.status(200)
    expect(sydneyWeather.body.city.name).to.equal('Sydney')
    expect(sydneyWeather.body.city.country).to.equal('AU')
  })

  it('should be able to retrieve forecast of over 10degrees for at least one Thursday', () => {
    const forecast = sydneyWeather.body.list
    let warmThursdays = 0
    forecast.filter((weather) => {
      const day = moment.unix(weather.dt).utc()
      const daysOfWeek = day.isoWeekday()
      if (daysOfWeek === 4 && weather.temp.min > 10) { // 4 for thursday
        console.log('This is a warm Thursday > %o with minimum temp of %o', day.format('DD/MM/YYYY'), weather.temp.min)
        warmThursdays++
      }
    })
    expect(warmThursdays).to.be.above(0)
  })
})
