const momentTZ = require("moment-timezone");
const moment = require("moment");
// 这个文件,主要测试 moment 库的使用
// const moment = require('moment-timezone');

// 获取当前时间,这个时间是带时区的
const trtDayStamp = moment().tz("America/Toronto").startOf("day").valueOf();
console.log("1.trtDayStamp ", trtDayStamp);

const now = moment();
console.log("1.now ", now);
// 1.moment()  Moment<2022-12-05T11:27:39-05:00>, 取本地环境的时间
console.log("1.now ", now.valueOf());
// 本周一的 0 时 0 分 0 秒
const nowDay = now.startOf("day");
console.log("2.nowDay ", nowDay);
console.log("3.nowDay stamp", nowDay.valueOf());
// 2.nowDay  Moment<2022-12-05T00:00:00-05:00> 本周一

let nowTZ = momentTZ().tz("America/Toronto");
console.log("4.momentTZ() stamp", nowTZ.valueOf());
console.log("4.momentTZ() stamp", nowTZ);
nowTZ = momentTZ().tz("Asia/Shanghai");
console.log("4.1 momentTZ() stamp", nowTZ.valueOf());
console.log("4.1 momentTZ() stamp", nowTZ);
// 4.momentTZ() stamp   1670265116374
// 4.1 momentTZ() stamp 1670265116389
// 因为取的是当前的时间,用不同时区表现,是一个时间戳

const nowTZDay = nowTZ.startOf("day");
console.log("5.nowTZDay ", nowTZDay);
const yearTZDay = nowTZ.startOf("year");
console.log("6.yearTZDay stamp", yearTZDay.valueOf());

const dateStr = "2022-12-05";
const dateToday = new Date(dateStr);
const dateS = momentTZ(dateToday)
  .tz("America/Toronto")
  .startOf("year")
  .valueOf();
console.log("6.1 year stamp", dateS);

const nowUTC = momentTZ().utcOffset(0);
console.log("7.nowUTC stamp", nowUTC.valueOf());

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

const start_time = moment(LocalUnix).tz(siteTZ).format("MM/DD/YYYY HH:mm:ss");

console.log("siteDay, siteHour,start_time: ", siteDay, siteHour, start_time);

// yesterday's date
const yesterday = moment().tz("America/Toronto");
// 1. Get yesterday date with current timing
const yesterdayCurrentTiming = yesterday.toString();
console.log("yesterdayCurrentTiming:", yesterdayCurrentTiming);
// 2. Get yesterday date with start of the day
const yesterdayStart = yesterday.startOf("day").toString();
console.log("yesterdayStart:", yesterdayStart);

// 3. Get yesterday date with end of the day
const yesterdayEnd = yesterday.endOf("day").toString();
console.log("yesterdayEnd:", yesterdayEnd);
