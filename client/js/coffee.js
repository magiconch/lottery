var box0 = document.getElementById("box0"),
    title = document.getElementById("title"),
    box1 = document.getElementById("box1"),
    box2 = document.getElementById("box2"),
    pauseBtn = document.getElementById("pauseBtn"),
    restartBtn = document.getElementById("restartBtn");
let boxs = [box0, box1, box2];
var tween = new TweenMax(boxs, 2, {
    y: "-2560px",
    ease: Linear.easeNone,
    repeat: -1,
    paused: true
});

TweenMax.to(title, 4, { 
    x: "1800px",
    ease: SlowMo.ease
})

// ease:Bounce.easeOut,


function temp12() {
    // 需要scroll的长度
    let numberarray = [3, 6, 9];
    let timearray = [];
    numberarray.forEach( (item) => {
        timearray.push(item*2/16);
    } )
    TweenMax.to(box0, timearray[0], {
        y: `-${numberarray[0] * 160}px`,
        ease: Linear.easeNone, 
        repeat: 0,
        startAt:{y:0}
    });
    TweenMax.to(box1, timearray[1], {
        y: `-${numberarray[1] * 160}px`,
        ease: Linear.easeNone,
        repeat: 0,
        startAt:{y:0}

    });
    TweenMax.to(box2, timearray[2], {
        y: `-${numberarray[2] * 160}px`,
        ease: Linear.easeNone, repeat: 0,
        startAt:{y:0}
    });

}

function getNumber() {

}

function output() {
    TweenMax.staggerTo(".box", 1, {rotation:360, y:100}, 0.5);
}

function calDistance(num) {
    let result = [];
    result.push(num % 256);
    result.push(Math.floor(num) % 10);
    result.push(num % 16);
}

function numberPause() {
    tween.pause();
    let mytime = tween.time();
    tween.kill();
    let stime = 2 - mytime;
    TweenMax.to(boxs, stime, {
        y: "-2560px",
        ease: Linear.easeNone,
        repeat: 0,
        onComplete: () => {
            boxs.forEach((item) => {
                item.style = "";
            });
            temp12();
        }
    });
}

pauseBtn.onclick = function () {
    numberPause();
}


restartBtn.onclick = function () {
    //重新开始.
    tween.restart();
}
