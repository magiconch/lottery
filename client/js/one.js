var box0 = document.getElementById("box0"),
    box1 = document.getElementById("box1"),
    box2 = document.getElementById("box2"),
    pauseBtn = document.getElementById("pauseBtn"),
    restartBtn = document.getElementById("restartBtn");
let boxs = [box0, box1, box2];
var tween = new TweenMax(boxs, 4, {
    y: "-2560px",
    ease: Linear.easeNone,
    repeat: -1,
    paused: true
});
// ease:Bounce.easeOut,

function temp12() {
    // 需要scroll的长度
    let numberarray = [3, 6, 9];
    TweenMax.to(box0, 4, {
        y: `-${numberarray[0] * 160}px`,
        ease: Bounce.easeOut, 
        repeat: 0,
        startAt:{y:0}
    });
    TweenMax.to(box1, 4, {
        y: `-${numberarray[1] * 160}px`,
        ease: Bounce.easeOut,
        repeat: 0,
        startAt:{y:0}

    });
    TweenMax.to(box2, 4, {
        y: `-${numberarray[2] * 160}px`,
        ease: Bounce.easeOut, repeat: 0,
        startAt:{y:0}
    });

}

pauseBtn.onclick = function () {
    tween.pause();
    let mytime = tween.time();
    tween.kill();
    let stime = 4 - mytime;
    tween2 = new TweenMax(boxs, stime, {
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



restartBtn.onclick = function () {
    //重新开始.
    tween.restart();
}
