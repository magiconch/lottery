var express = require('express');
var fs = require("fs");
var path = require('path');
var router = express.Router();


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

  push (item) {
      this.idList.push(item);
  }

  includes(item) {
      this.idList.includes(item);
  }

  reqNumber(count) {
    return this.generater();
  }

  generater() {
    let result = RandomTool.getRandomIntByFloor(this.maxNumber);
    while (this.includes(result)) {
      result = RandomTool.getRandomIntByFloor(this.maxNumber);
    }
    this.push(result);

    return result;
  }


}
let myList = new LuckyIdList(270);

var numberLog = fs.openSync('./public/number.txt', 'w');

/* GET users listing. */
router.get('/normal', function(req, res, next) {
  let num = myList.reqNumber(1);
  let fileNum = num.toString() + ' ';
  // fs.writeFile(numberLog, fileNum);
  res.json( num.toString());

});

module.exports = router;
