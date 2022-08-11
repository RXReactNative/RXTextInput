/**
 *
 * @this TextInputValue: 封装TextInput的 value
 *
 * @flow
 */
'use strict'
import rversion from '../utils/rversion'

const TextInputValue = rversion(() => {
  return require('./input/TextInputValue_17_after.js')
}, () => {
  return require('./input/TextInputValue.js')
})

module.exports = TextInputValue