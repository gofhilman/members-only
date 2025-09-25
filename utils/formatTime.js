const { tz } = require("@date-fns/tz");
const { formatRelative } = require("date-fns");

function formatTime(time, timeZone) {
  const formattedTime = formatRelative(time, new Date(), { in: tz(timeZone) });
  return formattedTime[0].toUpperCase() + formattedTime.slice(1);
}

module.exports = formatTime;
