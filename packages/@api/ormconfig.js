/* eslint-disable */
const { config } = require('@darkmagician/common')

const { database } = config.getConfig({ targetDatabase: 'dmgapi' })

module.exports = database
