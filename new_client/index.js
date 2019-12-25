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
            case 2:
                this.isRuning = !this.isRuning;
                break;
        }
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
        if(this._isRuning){
           return; 
        }
        this.createNumberCard(this._luckeyNumbers);
        this._ouputPanel.style.left = 0;

    }

    toggleOverlay(){
        var overlay = this._num_scroll.querySelector('.overlay');
        if(this._step !== 2){
            overlay.classList.add('hide');
        }else{
            overlay.classList.remove('hide');
        }
    }

    toggleAnimation(){
        var uls = this._num_scroll.querySelectorAll(".num_card");
        for (var i = 0; i < uls.length; i++) {
            if (this.isRuning) {
                uls[i].style.animation = "3s rowup linear infinite normal"
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
            div.textContent = num;
            frage.appendChild(div);
        });
        this._ouputPanel.appendChild(frage);
    }
}

const fetchLuckyNumber = (count, name, cb) => {
    // var httpRequest = new XMLHttpRequest();
    // httpRequest.open('GET', `http://localhost:9090/?count=${count}&name=${name}`, true);
    // httpRequest.send();
    // httpRequest.onreadystatechange = function () {
    //     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    //         var json = httpRequest.responseText;
    //         cb(parseFloat(json));
    //     }
    // };
    setTimeout(function() {
        cb(["001", "002","003","004","A01","0EA","AB1","021","345","451"]);
    }, 500);
}

window.game = new Game();

