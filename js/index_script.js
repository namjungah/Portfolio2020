console.log("Script Load");

(function($) {
    $(document).ready(function() {
        console.log('jQuery Ready');

        $('img').attr('draggable', false);
    });
})(jQuery);

// -- 이미지 3d
var figureEl = document.querySelector("#figure"),
    figureImgEl = figureEl.querySelector("img"),
    degree = 10;

function onMouseMoveFigure(e) {
    var x = e.clientX - figureEl.getBoundingClientRect().left + window.pageXOffset,
        y = e.clientY - figureEl.getBoundingClientRect().top + window.pageYOffset,
        rotX = getRange(y, 0, e.currentTarget.getBoundingClientRect().height, degree * -1, degree),
        rotY = getRange(x, 0, e.currentTarget.getBoundingClientRect().width, degree * -1, degree);
    gsap.killTweensOf(figureImgEl);
    gsap.to(figureImgEl, {rotationX: rotX, rotationY: rotY, duration: 0.2});
}
function onMouseLeaveFigure(e) {
    gsap.killTweensOf(figureImgEl);
    gsap.to(figureImgEl, {rotationX: 0, rotationY: 0, duration: 0.4, ease: "sine.out"});
}

function getRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function addEvent() {
    figureEl.addEventListener("mousemove", onMouseMoveFigure);
    figureEl.addEventListener("mouseleave", onMouseLeaveFigure);
}
function init() {
    addEvent();
}
init();


// -- 텍스트 롤링
var rollingData = [
    '작은 일에도 최선을 다하는',
    '인수인계가 확실한',
    '조화를 중시하는',
    '말 없이 도와주는',
    '적응력이 뛰어난',
    '끊임없이 협업하는',
  ] 

var timer = 2000;
var first = document.getElementById('first'),
second = document.getElementById('second'),
third = document.getElementById('third');
var move = 2
var dataCnt = 1
var listCnt = 1

first.children[0].innerHTML = rollingData[0]

setInterval(function () {
    if(move == 2){
    first.classList.remove('card_sliding')
    first.classList.add('card_sliding_after')

    second.classList.remove('card_sliding_after')
    second.classList.add('card_sliding')

    third.classList.remove('card_sliding_after')
    third.classList.remove('card_sliding')

    move = 0
    } else if (move == 1){
    first.classList.remove('card_sliding_after')
    first.classList.add('card_sliding')

    second.classList.remove('card_sliding_after')
    second.classList.remove('card_sliding')

    third.classList.remove('card_sliding')
    third.classList.add('card_sliding_after')

    move = 2
    } else if (move == 0) {
    first.classList.remove('card_sliding_after')
    first.classList.remove('card_sliding')

    second.classList.remove('card_sliding')
    second.classList.add('card_sliding_after')

    third.classList.remove('card_sliding_after')
    third.classList.add('card_sliding')

    move = 1
    }

    if(dataCnt < (rollingData.length - 1)) {
        document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
        dataCnt++
    } else if(dataCnt == rollingData.length - 1) {
        document.getElementById('rolling_box').children[listCnt].children[0].innerHTML = rollingData[dataCnt]
        dataCnt = 0
    }

    if(listCnt < 2) {
        listCnt++
    } else if (listCnt == 2) {
        listCnt = 0
    }

// console.log(listCnt)

}, timer);
