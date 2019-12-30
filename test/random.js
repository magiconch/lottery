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
  
    _push (item) {
        this.idList.push(item);
    }
  
    __includes(item) {
        return this.idList.includes(item);
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
      this._push(result);
      return result;
    }
  
  
  }
  let myList = new LuckyIdList(270);



let test = [];
for (let index = 0; index < 270; index++) {
    test.push(myList.generater());
}

let array = test;
let obj = {}
for ( let i = 0, length = array.length; i < length; i++) {
    obj[array[i]] = i;
}
if ( array.length != Object.keys(obj).length) {
    console.log("有重复的");
} else {
    console.log("pass");
}

var _arr = test;
var _res = []; //   
_arr.sort();  
for (var i = 0; i < _arr.length;) {  
    var count = 0;  
    for (var j = i; j < _arr.length; j++) {  
        if (_arr[i] == _arr[j]) {  
            count++;  
        }  
    }  
    _res.push([_arr[i], count]);  
    i += count;  
}  
//_res 二维数维中保存了 值和值的重复数  
var _newArr = [];  
for (var i = 0; i < _res.length; i++) {  
    // console.log(_res[i][0] + "重复次数:" + _res[i][1]);
    _newArr.push(_res[i][0] + 'x' + _res[i][1]);
}  
console.log(_newArr); 

// console.log(test);