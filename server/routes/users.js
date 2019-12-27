var express = require('express');
var fs = require("fs");
var path = require('path');
var router = express.Router();
var logger = require('morgan');


class RandomTool {

  static getRandomIntByFloor(max) {
      return Math.floor(Math.random() * Math.floor(max));
  }
  
  static getRandomIntByRandomSite(max) {
      var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
          httpRequest.open('GET', `https://www.random.org/integers/?num=1&min=1&max=${max}&col=1&base=10&format=plain&rnd=new`, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
          httpRequest.send();//第三步：发送请求  将请求参数写在URL中
          /**
           * 获取数据后的处理程序
           */
          httpRequest.onreadystatechange = function () {
              if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                  var json = httpRequest.responseText;//获取到json字符串，还需解析
                  return parseFloat(json);
              }
          };
  }
}

class LuckyIdList {

  constructor(maxNumber) {
    this.maxNumber = maxNumber;
    this.idList = [];
  }

  init() {
      this.idList = [];
  }

  __push (item) {
      this.idList.push(item);
  }

  __includes(item) {
      this.idList.includes(item);
  }

  reqNumber(count) {
    let result = [];
    for (let index = 0; index < count; index++) {
      result.push(this.generater())
      
    }
    return result;
  }

  generater() {
    let result = RandomTool.getRandomIntByFloor(this.maxNumber);
    while (this.__includes(result)) {
      result = RandomTool.getRandomIntByFloor(this.maxNumber);
    }
    this.__push(result);

    return result;
  }


}
let myList = new LuckyIdList(270);

var logFile = fs.createWriteStream('./numbers.log', {
  "flags": "a"
});

var numberLog = fs.openSync('./public/number.txt', 'w');

logger.format('joke', '[joke] :method :url :status');
/* GET users listing. */
router.get('/', function(req, res, next) {
  let myUrl = req.url;
  let temp = myUrl.split('count=')[1].split('&');
  let name = temp[1].split('name=')[1];
  let count = parseInt(temp[0]);
  let nums = myList.reqNumber(count);
  console.log(`name: ${name}, nums: ${nums}`)
  // let fileNum = num.toString() + ' ';
  // logger('joke');
  // express.configure(function(){
  //   express.logger({stream: logFile});
  // });  
  // fs.write(numberLog, fileNum);
  res.json( nums );
});

module.exports = router;
