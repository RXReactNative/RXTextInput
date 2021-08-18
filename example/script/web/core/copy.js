const { copySync } = require('fs-extra')

function copy(path1, path2, callback = () => { }) {
  copySync(path1, path2)
  callback && callback()
}

module.exports = copy