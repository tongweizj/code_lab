const moment = require("moment-timezone");
// 这个文件,主要测试 nodejs 原生自带的 Date() 函数

// 生产Date() 对象,时间是,当前的 utc 时间,不带时区
new Date();

// 当前utc 时间戳, 不带时区
new Date().getTime();

const dayStart = new Date(new Date().setHours(0, 0, 0, 0)) - 0;
console.log("dayStart:", dayStart);

const dateStr = "2022-01-01";
const dayStart2 = new Date(dateStr + " 00:00:00:000").getTime();
console.log("dayStart2:", dayStart2);

const dayStart3 = new Date(dateStr + " 00:00:00:000z").getTime();
console.log("dayStart3:", dayStart3);

const dayStart4 = new Date(dateStr + " 00:00:00:000 UTC-4").getTime();
console.log("dayStart4:", dayStart4);

const now = new Date();
console.log("now:", now);

const dayStart5 = new Date("2022-01-01T00:00:00.000Z").getTime();
console.log("dayStart5:", dayStart5);
// 1641013200000

const dayStart6 = new Date("January 1, 2022 00:00:00 GMT-05:00").getTime();
console.log("dayStart6:", dayStart6);

const dayStart7 = new Date(now.getFullYear() + "-01-01 00:00:00:000 GMT-05:00");
console.log("dayStart7:", dayStart7);

console.log(new Date().getTime());

const dayStart8 = moment(new Date("2022-01-01T00:00:00.000").getTime())
  .tz("America/Toronto")
  .startOf("year")
  .valueOf();

console.log("dayStart8:", dayStart8);

this.getToDay = function () {
  const timestampStart = new Date(new Date().setHours(0, 0, 0, 0)) - 0;
  //一天是86400秒   故n天前的时间戳为
  var timestampEnd = timestampStart + 1000 * 60 * 60 * 24 * 1;

  return {
    start: timestampStart,
    end: timestampEnd,
  };
};
this.getLastDay = function () {
  const timestampEnd = new Date(new Date().setHours(0, 0, 0, 0)) - 0;
  // console.log(timestampEnd)
  //一天是86400秒   故n天前的时间戳为
  var timestampStart = timestampEnd - 1000 * 60 * 60 * 24 * 1;
  // console.log(timestampStart)

  return {
    start: timestampStart,
    end: timestampEnd,
  };
};
// 取前一天的日期
this.getLastDate = function () {
  const timestamp = new Date(
    new Date().setHours(0, 0, 0, 0) - 1000 * 60 * 60 * 24 * 1
  );
  const dateStr =
    timestamp.getFullYear() +
    "/" +
    (timestamp.getMonth() + 1) +
    "/" +
    timestamp.getDate();

  return dateStr;
};
// 取今天的日期
this.getTodayDate = function () {
  const timestamp = new Date(new Date().setHours(0, 0, 0, 0) + 1);
  const dateStr =
    timestamp.getFullYear() +
    "/" +
    (timestamp.getMonth() + 1) +
    "/" +
    timestamp.getDate();

  return dateStr;
};

// 取现在的小时数
this.getNow = function () {
  const timestamp = new Date(Date.now());
  const dateStr = [
    timestamp.getFullYear(),
    timestamp.getMonth() + 1,
    timestamp.getDate(),
    timestamp.getHours(),
    timestamp.getMinutes(),
  ];

  return dateStr;
};
