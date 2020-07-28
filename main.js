
//***********------------ FLYING KENNY AND STARS ------------************* */

document.addEventListener("mousemove", function (e) {
    let kenny = document.querySelector(".kenny");
    kenny.style.left = e.offsetX + 'px';
    kenny.style.top = e.offsetY + 'px';
})
function stars() {
    let count = 30;
    let scene = document.querySelector('.scene');
    let i = 0;
    while (i < count) {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 5;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 2 + 'px';
        //length of star
        star.style.height = 40 + h + 'px';
        star.style.animationDuration = duration + 's';
        star.style.zIndex = -1;

        scene.appendChild(star);
        i++;
    }
}

stars();

//***********------------ CONSTANTS ------------************* */
const imagesObjArray = [
    { name: 'cartman', image: 'img/cartman.png' },
    { name: 'jimmy', image: 'img/jimmy.png' },
    { name: 'kyle', image: 'img/kyle.png' },
    { name: 'satan', image: 'img/satan.png' },
    { name: 'stan', image: 'img/stan.png' },
    { name: 'timmy', image: 'img/timmy.png' },
];

const hightlightArr = [w1, w2, w3, w4, l1, l2];

//***********------------ VARIABLES ------------************* */

let tokensAmount;
let spinResults = [];

//***********------------ REFERENCES ------------************* */

let betInput = document.querySelector('#betInput');
let betBtn = document.querySelector('#betBtn');
let roller = document.querySelector('#spinner-section');
let quitBtn = document.querySelector('#quitBtn');
let helloChildren_audio = document.getElementById('helloChildren');
let tokens = document.querySelector('#tokens');
const imageTags = document.querySelectorAll(".roller > img");  //object nodelist of image

let chef_audio = document.querySelector('#chef_audio');
let place_bet_audio = document.querySelector('#place_bet');
let cartman_audio = document.querySelector('#cartman_pay');
let stan_audio = document.querySelector('#stan_sweet');
let kyle_audio = document.querySelector('#kyle_fart');
let satan_audio = document.querySelector('#satan');
let win_audio = document.querySelector('#kenny');
let timmy_audio = document.querySelector('#timmy');
let slot_audio = document.querySelector('#roll_slot');
//***********------------ EVENT LISTENER ------------************* */

betBtn.addEventListener('click', placeBet);
quitBtn.addEventListener('click', initialize);
roller.addEventListener('click', spin);
//Hello there children
chef_audio.addEventListener('click', function () {
    helloChildren_audio.play();
});


//***********------------ FUNCTIONS ------------************* */

initialize();

function initialize() {
    tokensAmount = 0;
    tokens.innerText = '000000';
    betInput.placeholder = '$0.00';
    hightLightRemover();
    for (let index = 0; index < imageTags.length; index++) {
        imageTags[index].src = imagesObjArray[Math.floor(Math.random() * imagesObjArray.length)].image;
        imageTags[index].style.width = '81%';
    }
    inputInitializer()
}

function placeBet() {
    if (!isNaN(betInput.value) && betInput.value.length > 0) {
        place_bet_audio.play()
        tokensAmount += Math.floor(betInput.value) / 0.05;
        tokens.innerHTML = sixDigit(tokensAmount);
        betInput.placeholder = '$0.00';
        inputInitializer();
    }
    else {
        betInput.placeholder = "Don't be mean";
        inputInitializer();
    }
}

function spin() {
    if (tokens.innerHTML > 0) {
        hightLightRemover();
        tokensAmount -= 10;
        tokens.innerHTML = sixDigit(tokensAmount);
        for (let index = 0; index < imageTags.length; index++) {
            spinResults[index] = imagesObjArray[Math.floor(Math.random() * imagesObjArray.length)].image;
        }
        setImageToRoller(spinResults);
    }
    else betInput.placeholder = "You are out of money";
}

function setImageToRoller(imgObj) {
    let t = 0;
    for (let index = 0; index < imageTags.length; index++) {
        setTimeout(() => {
            imageTags[index].src = imgObj[index]
        }, t += 200);
    };
    rule(spinResults);
}

function rule(arr) {
    var count = {};
    arr.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
    for (let key in count) {
        if (count[key] == 2) {
            if (key == "img/stan.png") {
                stan_audio.play();
                tokensAmount += 50;
                tokens.innerHTML = sixDigit(tokensAmount);
                w1.style.background = 'yellow';
                w1.style.color = 'blue';
            }
            else if (key == "img/kyle.png") {
                kyle_audio.play();
                tokensAmount += 100;
                tokens.innerHTML = sixDigit(tokensAmount);
                w3.style.background = 'yellow';
                w3.style.color = 'blue';
            }
            else if (key == "img/satan.png") {
                satan_audio.play()
                tokensAmount *= 0.4;
                tokens.innerHTML = sixDigit(tokensAmount);
                l1.style.background = 'yellow';
                l1.style.color = 'blue';
            }
            else if (key == "img/timmy.png") {
                timmy_audio.play()
                tokensAmount = Math.floor(tokensAmount * 1.2);
                tokens.innerHTML = sixDigit(tokensAmount);
                w4.style.background = 'yellow';
                w4.style.color = 'blue';
            }
        }
        else if (count[key] == 3 && key == "img/cartman.png") {
            cartman_audio.play();
            tokensAmount -= 300;
            tokens.innerHTML = sixDigit(tokensAmount);
            l2.style.background = 'yellow';
            l2.style.color = 'blue';
        }
        else if (count[key] == 3) {
            win_audio.play();
            tokensAmount += 500;
            tokens.innerHTML = sixDigit(tokensAmount);
            w2.style.background = 'yellow';
            w2.style.color = 'blue';
        }
    }
}



function inputInitializer() {
    betInput.value = '';
    betInput.style = null;
}

function sixDigit(number) {
    if (number <= 9999) { number = ("00000" + number).slice(-6); }
    return number;
}

function hightLightRemover() {

    for (i = 0; i < hightlightArr.length; i++) {
        hightlightArr[i].style = null;
    }
    console.log("hightLightRemover worked");
}