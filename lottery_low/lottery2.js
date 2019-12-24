class LuckyIdList {

    constructor() {
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


}

class NumScroll {

    constructor(scrollNumberContainer, maxLengthOfScrollNumbers) {
        this.scrollNumberContainer = scrollNumberContainer;
        this.snn = maxLengthOfScrollNumbers;
        this.sns = [];
        for (var i = 0; i < this.snn; ++i) {
            var sn = document.createElement("div");
            sn.className = "scroll-number";
            sn.innerHTML = "0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>A<br>B<br>C<br>D<br>E<br>F";
            scrollNumberContainer.appendChild(sn);
            this.sns.push(sn);
        }
    }

    // animation-name: roll;
    // animation-duration: 2s;
    // animation-timing-function: linear;
    // animation-iteration-count: 30;
    // animation-fill-mode: backwards;
    // animation-direction: normal;
    // animation-play-state: paused;
    start() {
        for (const iterator of this.sns) {
            iterator.setAttribute('animation', 'roll 2s linear 30 backwards normal');
        }
    }

    stop(maxNumber) {

    }
}

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



let myDom = document.getElementById("myScrollNumbers");
let idList = new LuckyIdList();
let ssn = new NumScroll(myDom, 3, 160);

let maxNumber = RandomTool.getRandomIntByFloor(300);
ssn.stop(maxNumber);
idList.push(maxNumber);
console.log(maxNumber);
