var rewards = [
    {name: "腾讯视频VIP季卡", count: 10},
    {name: "Luckin coffee优惠券", count: 10},
    {name: "腾讯视频VIP季卡", count: 10},
    {name: "相声新势力", count: 3},
    {name: "天空之城音乐演奏会", count: 2},
    {name: "《哈姆雷特》戏剧", count: 2},
    {name: "华为荣耀手环", count: 10},
    {name: "双人海鲜自助午餐", count: 2},
    {name: "双人海鲜自助晚餐", count: 2},
    {name: "瑞丝丽酒店豪华套房", count: 2},
    {name: "悦椿温泉酒店", count: 1},
]

class Game{
    _isRuning= false;
    _btn_go = document.getElementById("go");
    _num_scroll = document.getElementById("number-c");
    _ouputPanel = document.querySelector(".output-panel");
    _title = document.querySelector('.title');
    _currentReward = -1;
    _luckeyNumbers = [];
    _step = -1;

    constructor(){
        this._btn_go.addEventListener('click', () => {
            this.go();
        })
    }

    go(){
        this._step = (this._step + 1) % 3;
        switch(this._step){
            case 0:
                this.currentReward = this.currentReward + 1;
                break;
            case 1:
                this.numberRoll();
                break;
            case 2:
                this.isRuning = !this.isRuning;
                numberPause(this._luckeyNumbers[this._luckeyNumbers.length-1]);
                break;
        }
    }

    numberRoll() {
        tween.restart();
    }

    get isRuning(){
        return this._isRuning;
    }

    set isRuning(value){
        this._isRuning = value;
        
        this._btn_go.textContent = this.isRuning ? "Stop" : "Go";
        this.toggleAnimation();
        this.toggleOverlay();
        this.output();
    }

    get currentReward(){
        return this._currentReward;
    }

    set currentReward(v){
        this._currentReward = v;
        var rw = rewards[this._currentReward];
        this._title.innerHTML = rw.name;
        this._ouputPanel.innerHTML = "";
        this._ouputPanel.style.left = "-3000px";
        fetchLuckyNumber(rw.count, rw.name, (luckies) => this._luckeyNumbers = luckies);
    }

    output(){
        // if(this._isRuning){
        //    return; 
        // }
        this.createNumberCard(this._luckeyNumbers);
        this._ouputPanel.style.left = 0;

    }

    toggleOverlay(){
        // var overlay = this._num_scroll.querySelector('.overlay');
        // if(this._step !== 2){
        //     overlay.classList.add('hide');
        // } else{
        //     overlay.classList.remove('hide');
        // }
    }

    toggleAnimation(){
        var uls = this._num_scroll.querySelectorAll(".num_card");
        for (var i = 0; i < uls.length; i++) {
            if (this.isRuning) {
                uls[i].style.animation = "3s rowup linear infinite normal";
            } else {
                uls[i].style.removeProperty("animation");
            }
        }
    }

    createNumberCard(nums){
        var frage = document.createDocumentFragment();
        nums.forEach(num => {
            var div = document.createElement("div");
            div.classList.add("number_card");
            div.textContent = this.stringFormat(num);
            frage.appendChild(div);
        });
        this._ouputPanel.appendChild(frage);
    }

    stringFormat(rn) {
        if (typeof rn === 'string') {
            rn = parseInt(rn);
        }
        let myNum = rn.toString(16).toUpperCase();
        while(myNum.length < 3) {
            myNum = '0' + myNum;
        }
        return myNum;
    }
}

const fetchLuckyNumber = (count, name, cb) => {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', `http://localhost:9090/users?count=${count}&name=${name}`, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            json = json.slice(1,json.length-1);
            let jsons = json.split(',');
            cb(jsons);
        }
    };
}

var box0 = document.getElementById("box0"),
    box1 = document.getElementById("box1"),
    box2 = document.getElementById("box2");
let boxs = [box0, box1, box2];
var tween = new TweenMax(boxs, 2, {
    y: "-3200px",
    ease: Linear.easeNone,
    repeat: -1,
    paused: true
});

function temp12(num) {
    
    // 需要scroll的长度
    let numberarray = calDistance(num);
    let timearray = [];
    numberarray.forEach( (item) => {
        timearray.push(item*2/16);
    } )
    TweenMax.to(box0, timearray[0], {
        y: `-${numberarray[0] * 200}px`,
        ease: Linear.easeNone, 
        repeat: 0,
        startAt:{y:0}
    });
    TweenMax.to(box1, timearray[1], {
        y: `-${numberarray[1] * 200}px`,
        ease: Linear.easeNone,
        repeat: 0,
        startAt:{y:0}

    });
    TweenMax.to(box2, timearray[2], {
        y: `-${numberarray[2] * 200}px`,
        ease: Linear.easeNone, repeat: 0,
        startAt:{y:0}
    });


}

function calDistance(num) {
    num = parseInt(num);
    let result = [];
    result.push(Math.floor(num/256));
    result.push(Math.floor(num/16));
    result.push(num % 16);
    return result;
}

function numberPause(num) {
    tween.pause();
    let mytime = tween.time();
    tween.kill();
    let stime = 2 - mytime;
    TweenMax.to(boxs, stime, {
        y: "-3200px",
        ease: Linear.easeNone,
        repeat: 0,
        onComplete: () => {
            boxs.forEach((item) => {
                item.style = "";
            });
            temp12(num);
        }
    });
}

window.game = new Game();
