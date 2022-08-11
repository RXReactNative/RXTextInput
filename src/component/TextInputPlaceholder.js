/**
 *
 * @this TextInputPlaceholder: 封装input的 placeholder
 *
 * @flow
 */
'use strict'
import rversion from '../utils/rversion'

const TextInputPlaceholder = rversion(() => {
  return require('./placeholder/TextInputPlaceholder_17_after.js')
}, () => {
  return require('./placeholder/TextInputPlaceholder.js')
})

module.exports = TextInputPlaceholder