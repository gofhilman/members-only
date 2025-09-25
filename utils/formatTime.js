const { formatRelative } = require("date-fns");

function formatTime(time) {
  const formattedTime = formatRelative(time, new Date());
  return formattedTime[0].toUpperCase() + formattedTime.slice(1);
}

module.exports = formatTime;
