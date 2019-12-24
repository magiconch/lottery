let MAXCOUNT = [1, 2, 3, 10] // 1,2,3,4 等奖的数量

let count = [0, 0, 0, 0];


function createScrollNumbers(containerOrContainerId, maxLengthOfScrollNumbers, fontHeight) {
    var snn = maxLengthOfScrollNumbers;
    var scrollNumberContainer;
    if (typeof containerOrContainerId === "string") {
        scrollNumberContainer = document.getElementById(containerOrContainerId);
    } else {
        scrollNumberContainer = containerOrContainerId;
    }

    var sns = [];
    for (var i = 0; i < snn; ++i) {
        var sn = document.createElement("div");
        sn.className = "scroll-number";
        sn.innerHTML = "0<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>A<br>B<br>C<br>D<br>E<br>F";
        scrollNumberContainer.appendChild(sn);
        sns.push(sn);
    }

    function getInts(number) {
        var ints = [];
        number = Math.floor(number);

        while (number > 0) {
            var n = number % 16;
            ints.push(n);
            number = Math.floor(number / 16);
        }

        return ints;
    }

    function setScrollNumbers(rn) {
        var ints = getInts(rn);

        var s = snn - ints.length;

        if (s < 0) {
            ints.length = snn;
            console.warning("number is too big!");
        }

        for (var i = 0; i < s; ++i) {
            ints.push(0);
        }
        ints = ints.reverse();
        for (var i = 0, snsl = sns.length; i < snsl; ++i) {
            rollAll(sns[i], fontHeight, ints[i]);
            
        }
    }

    return setScrollNumbers;
}

function rollAll(sns,fontHeight, ints ) {
    sns.style.top = "" + (-fontHeight * ints) + "px";
}

var ssn = createScrollNumbers("myScrollNumbers", 3, 160);
var displayBlock = document.getElementById('show-result');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntByRandomSite(max) {
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



function showResult(rn, parent) {
    let showNum = document.createElement('div');
    let numtext = document.createElement('a');
    numtext.className = 'number-content'
    showNum.appendChild(numtext);
    showNum.className = 'display-number';
    let myNum = rn.toString(16).toUpperCase();
    while(myNum.length < 3) {
        myNum = '0' + myNum;
    }
    console.log(myNum.length);
    numtext.innerText = myNum
    parent.appendChild(showNum);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function roll(levelList) {
    var rn = getRandomInt(300);
    ssn(rn);
   //  await sleep(1500);
    showResult(rn, levelList);
}


document.getElementById('run-it').onclick = () => {
    let value = document.getElementById('select-value').value;
    if (value === 'first-prize') {
        if (count[0] < MAXCOUNT[0]) {
            let levelList = document.getElementById('first-display');
            if (count[0] === 0) {
                let title = document.createElement('a');
                title.className = 'prize-title';
                title.innerText = '一等奖: ';
                levelList.appendChild(title)
            }
            displayBlock.appendChild(levelList);
            roll(levelList); 
            count[0] += 1;
        }
        
    } else if (value === 'second-prize') {
        if (count[1] < MAXCOUNT[1]) {
            let levelList = document.getElementById('second-display');
            displayBlock.appendChild(levelList);
            if (count[1] === 0) {
                let title = document.createElement('a');
                title.className = 'prize-title';
                title.innerText = '二等奖: ';
                levelList.appendChild(title)
            }
            roll(levelList); 
            count[1] += 1;
        }
    } else if (value === 'third-prize') {
        if (count[2] < MAXCOUNT[2]) {
            let levelList = document.getElementById('third-display');
            displayBlock.appendChild(levelList);
            if (count[2] === 0) {
                let title = document.createElement('a');
                title.className = 'prize-title';
                title.innerText = '三等奖: ';
                levelList.appendChild(title)
            }
            roll(levelList); 
            count[2] += 1;
        }
    } else if (value === 'fourth-prize') {
        if (count[3] < MAXCOUNT[3]) {
            let levelList = document.getElementById('fourth-display');
            displayBlock.appendChild(levelList);
            if (count[3] === 0) {
                let title = document.createElement('a');
                title.className = 'prize-title';
                title.innerText = '四等奖: ';
                levelList.appendChild(title)
            }
            roll(levelList); 
            count[3] += 1;
        }
    } else {
        console.log(value);
    }
    
    
}