
const copy = require('./core/copy')
const del = require('./core/del')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '..', '..', '..')
const EXAMPLE_PATH = path.join(ROOT_PATH, 'example')
const REACT_NATIVE_RXINPUT = path.join(EXAMPLE_PATH, 'react-native-rxinput')

const dir = 'src'
const FROM_INPUT_SRC = path.join(ROOT_PATH, dir)
const TO_INPUT_SRC = path.join(REACT_NATIVE_RXINPUT, dir)

const fileName = 'index.js'
const FROM_INDEX = path.join(ROOT_PATH, fileName)
const TO_INDEX = path.join(REACT_NATIVE_RXINPUT, fileName)

del(REACT_NATIVE_RXINPUT)
copy(FROM_INPUT_SRC, TO_INPUT_SRC)
copy(FROM_INDEX, TO_INDEX)