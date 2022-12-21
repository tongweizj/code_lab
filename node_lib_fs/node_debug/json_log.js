const fs = require("fs");
// json 格式文件
const radioStatusData = { hello: "word" };

// 在开发过程中,要保留和观察数据时,可以将文件保存到本地
// JSON.stringify(radioStatusData) 是将 json 文件的 buffer 格式改成 string
fs.writeFileSync(
  "./test/radioStatusData.json",
  JSON.stringify(radioStatusData)
);
