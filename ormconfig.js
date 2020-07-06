/* eslint-disable */
const { config } = require('@darkmagician/common')

const { database } = config.getConfig({ targetDatabase: 'dmg_api' })

module.exports = database
