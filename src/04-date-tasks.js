/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */

/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}

/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const time = (endDate - startDate) / 1000;
  function formatDuration(timeInSeconds) {
    let ss = timeInSeconds;
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInYear = secondsInDay * 365;
    const timeData = [];
    if (ss >= secondsInYear) {
      const years = Math.floor(ss / secondsInYear);
      ss -= years * secondsInYear;
      timeData.push(years);
    }
    if (ss >= secondsInDay) {
      const days = Math.floor(ss / secondsInDay);
      ss -= days * secondsInDay;
      timeData.push(days);
    }
    if (ss >= secondsInHour) {
      let hours = Math.floor(ss / secondsInHour);
      ss -= hours * secondsInHour;
      hours = hours.toString().padStart(2, 0);
      timeData.push(hours);
    } else {
      timeData.push('00');
    }
    if (ss >= secondsInMinute) {
      let minutes = Math.floor(ss / secondsInMinute);
      ss -= minutes * secondsInMinute;
      minutes = minutes.toString().padStart(2, 0);
      timeData.push(minutes);
    } else {
      timeData.push('00');
    }
    timeData.push(Math.floor(ss).toString().padStart(2, 0));
    const mSeconds = (ss - Math.floor(ss)).toString().slice(2, 5).padEnd(3, 0);
    return `${timeData.join(':')}.${mSeconds}`;
  }
  return formatDuration(time);
}

/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  if (hours >= 12) {
    hours -= 12;
  }
  const hoursDeg = hours * 30;
  const minutesDeg = minutes * 5.5;
  let delta = Math.abs(minutesDeg - hoursDeg);
  if (delta === 0) return 0;
  if (delta > 180) {
    delta = 360 - delta;
  }
  const rad = Math.PI / 180;
  return rad * delta;
}

module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
