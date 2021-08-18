
const { removeSync } = require('fs-extra')

function del(path) {
  removeSync(path)
}

module.exports = del