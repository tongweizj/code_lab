const fs = require('fs');

const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;
  
    if(url === '/') {
      res.write('<html>');
      res.write('<head><title>Message</title></head>');
      res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
      res.write('</html>');
      return res.end();  
    }
  
    if(url === '/message' && method === 'POST') {
      // console.log(req); 
      const body = [];
      req.on('data', (chunk)=>{
        console.log(chunk);
        body.push(chunk);
      });
      req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString();
        const message = parseBody.split('=')[1]; // parse Body 解析body
        fs.writeFileSync('message.txt', message);
      });
      res.setHeader('Location','/'); // 指向 /
      res.statusCode = 302;
      return res.end();
    }
    

    res.setHeader('Content-Type','text/Html');
    res.write('<html>');
      res.write('<head><title>hello</title></head>');
      res.write('<h1>hello</h1></body>');
      res.write('</html>');
    res.end();
  
    // console.log(res);
}

const someText = 'Some hard coded text';


/* 注册方法 1 
module.exports = requestHandler;
*/

// 注册方法 2 
module.exports = {
  handler: requestHandler,
  someText: someText
};


/* 注册方法 3 功能上面一致
module.exports.handler = requestHandler;
module.exports.someText = someText;
*/

/* 注册方法 4
exports.handler = requestHandler;
exports.someText = someText;
*/