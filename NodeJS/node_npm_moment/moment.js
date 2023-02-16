const momentTZ = require("moment-timezone");
const moment = require("moment");
// 这个文件,主要测试 moment 库的使用
// const moment = require('moment-timezone');

// 时间点
const momentTtr = moment().tz("America/Toronto");
const momentNow = moment();
const momentStamp = momentTZ(1672876799999).tz("America/Toronto");
const momentDate = momentTZ(new Date("2022-12-05")).tz("America/Toronto");

// 获取 startOf & endOf
// momentTtr
console.log("1.trtDayStamp ", momentTtr.startOf("day").valueOf());

console.log("6.yearTZDay stamp", momentTtr.startOf("year").valueOf());

// momentNow
// console.log("1.now ", momentNow);
// Moment<2022-12-05T11:27:39-05:00>, 取本地环境的时间

// console.log("1.now ", now.valueOf());
// 本周一的 0 时 0 分 0 秒

// const nowDay = momentNow.startOf("day");
// console.log("2.nowDay ", nowDay);

// console.log("3.nowDay stamp", nowDay.valueOf());
// 2.nowDay  Moment<2022-12-05T00:00:00-05:00> 本周一

// 指定日期
const dateStr = "2022-12-05";
const dateToday = new Date(dateStr);
const dateS = momentTZ(dateToday)
  .tz("America/Toronto")
  .startOf("year")
  .valueOf();
// console.log("6.1 year stamp", dateS);

// 用时间戳,直接获得当周\当年第一天的时间戳
const dateStr1 = "2023-01-05";
const dateToday1 = new Date(dateStr1) - 1;
console.log("6.1 date stamp", dateToday1);
const dateS1 = momentTZ(1672876799999)
  .tz("America/Toronto")
  .startOf("year")
  .valueOf();

console.log("6.2.year stamp", dateS1);

const dayStamp = momentTtr.startOf("day").valueOf();
const weekStamp = momentTtr.startOf("isoweek").valueOf();
const nowUTC = momentTZ().utcOffset(0);

// 1641013200000
// Assuming that this timestamp is in milliseconds:
// GMT: Saturday, January 1, 2022 5:00:00 AM
// Your time zone: Saturday, January 1, 2022 12:00:00 AM GMT-05:00

// 1609477200000
// GMT: Friday, January 1, 2021 5: 00: 00 AM
// Your time zone: Friday, January 1, 2021 12: 00: 00 AM GMT - 05: 00

// // without timezone set, use 'America/Toronto' as default
const siteTZ = "America/Toronto";

const local = new Date();
const LocalUnix = local.getTime();
const siteTime = moment(LocalUnix).tz(siteTZ);
const siteDay = siteTime.day();
const siteHour = siteTime.hour();

const start_time = moment(1672876799999).tz(siteTZ).format("MM/DD/YYYY"); //MM/DD/YYYY HH:mm:ss

console.log("siteDay, siteHour,start_time: ", siteDay, siteHour, start_time);

// today's date

console.log("today CurrentTiming:", momentTtr.toString());

// 2. Get today date with start of the day
const todayStart = momentTtr.startOf("day").toString();
console.log("todayStart:", todayStart);

// 3. Get yesterday date with end of the day
const todayEnd = momentTtr.endOf("day").toString();
console.log("todayEnd:", todayEnd);

// 2. Get today date with start of the day
console.log("todayStart:", momentTtr.startOf("day").valueOf());

// 3. Get yesterday date with end of the day
console.log("todayEnd:", momentTtr.endOf("day").valueOf());

console.log("weekStart:", momentTtr.startOf("week").valueOf());
console.log("isoweekStart:", momentTtr.startOf("isoweek").valueOf());

console.log("weekEnd:", momentTtr.endOf("week").valueOf());
console.log("isoweekEnd:", momentTtr.endOf("isoweek").valueOf());
// 取昨天的开始和结束
stampStart = momentTtr.subtract(1, "days").startOf("day").valueOf();
stampEnd = momentTtr.endOf("day").valueOf();
console.log("yesterdayStart:", stampStart);
console.log("yesterdayEnd:", stampEnd);

// 第 n 天
console.log("今年是:", momentTtr.year());
console.log("月份:", momentTtr.month() + 1);
console.log("月份:", momentTtr.format("MM"));
console.log("这个月,第几天:", momentTtr.format("DD")); //   days());
console.log("现在小时是:", momentTtr.format("HH"));
console.log("现在分钟是:", momentTtr.format("mm"));
console.log("今年是:", momentTtr.daysInMonth());
