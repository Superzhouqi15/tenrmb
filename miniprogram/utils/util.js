function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day, hour, minute]
}

function formatNumber(n) {
  n = n.toString()
}

module.exports = {
  formatTime: formatTime
}