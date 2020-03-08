'use strict'

import Mocha from 'mocha'
import fs from 'fs'
import path from 'path'

require('dotenv').config()

// mocha opts
const mocha = new Mocha({
  ui: 'bdd',
  timeout: '10000'
})

const testDir = 'test'

// Add .js test file on mocha instance
fs.readdirSync(testDir).filter((file) => {
  return file.substr(-3) === '.js'
}).forEach((file) => {
  mocha.addFile(
    path.join(testDir, file)
  )
})

// add list of required ENV here
const requiredEnv = [
  'API_KEY'
]
const unsetEnv = requiredEnv.filter((env) => !process.env[env])

if (unsetEnv.length > 0) {
  console.error('Required ENV variables are not set: [' + unsetEnv.join(', ') + ']')
  process.exit()
}

// Run the tests.
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0 // exit with non-zero status if there were failures
})
