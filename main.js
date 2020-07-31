//***********------------ FLYING KENNY AND STARS ------------************* */

document.addEventListener("mousemove", function (e) {
    let kenny = document.querySelector(".kenny");
    kenny.style.left = e.offsetX + 'px';
    kenny.style.top = e.offsetY + 'px';
})

function stars() {
    let count = 50;
    let scene = document.querySelector('.scene');
    let i = 0;
    while (i < count) {

        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 3;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 2 + 'px';
        star.style.height = 40 + h + 'px';

        star.style.height = 30 + h + 'px';
        star.style.animationDuration = duration + 's';
        star.style.zIndex = -99;

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
let count_for_input = 0;
let backup_tokens_innerHTML = '000000';
let backup_tokensAmount = 0;

//***********------------ REFERENCES ------------************* */

let betInput = document.querySelector('#betInput');
let betBtn = document.querySelector('#betBtn');
let roller = document.querySelector('#spinner-section');
let quitBtn = document.querySelector('#quitBtn');
let helloChildren_audio = document.getElementById('helloChildren');
let tokens = document.querySelector('#tokens');
const imageTags = document.querySelectorAll(".roller > img");

let chef_audio = document.querySelector('#chef_audio');
let place_bet_audio = document.querySelector('#place_bet');
let cartman_audio = document.querySelector('#cartman_pay');
let stan_audio = document.querySelector('#stan_stupid');
let kyle_audio = document.querySelector('#kyle_fart');
let satan_audio = document.querySelector('#satan');
let win_audio = document.querySelector('#kenny');
let timmy_audio = document.querySelector('#timmy');
let slot_audio = document.querySelector('#roll_slot');

//***********------------ EVENT LISTENER ------------************* */

betBtn.addEventListener('click', placeBet);
quitBtn.addEventListener('click', initialize);
roller.addEventListener('click', spin);
chef_audio.addEventListener('mouseover', function () {
    helloChildren_audio.play();
});


//***********------------ FUNCTIONS ------------************* */

initialize();

function initialize() {
    roller.addEventListener('click', spin);
    tokensAmount = 0;
    tokens.innerHTML = '000000';
    backup_tokens_innerHTML = '000000';
    backup_tokensAmount = 0;
    count_for_input = 0;
    betInput.placeholder = 'Maximum bet is $10';
    hightLightRemover();
    for (let index = 0; index < imageTags.length; index++) {
        imageTags[index].src = imagesObjArray[Math.floor(Math.random() * imagesObjArray.length)].image;
        imageTags[index].style.width = '81%';
    }
    inputInitializer();
}

function placeBet() {

    if (!isNaN(betInput.value) && betInput.value.length > 0 && betInput.value <= 10) {

        if (count_for_input < 1) {
            place_bet_audio.play()
            tokensAmount += Math.floor(betInput.value) / 0.05;
            tokens.innerHTML = sixDigit(tokensAmount);
            betInput.placeholder = '$0.00';
            backup_tokensAmount = tokensAmount;
            backup_tokens_innerHTML = tokens.innerHTML;
            inputInitializer();
            count_for_input++;
        }
        else {
            backup_tokensAmount = tokensAmount;
            backup_tokens_innerHTML = tokens.innerHTML;
            inputInitializer();
            betInput.placeholder = 'Kenny can place once only';
        }
    }
    else if (betInput.value > 10) {

        if (count_for_input > 1) {
            tokensAmount = backup_tokensAmount;
            tokens.innerHTML = backup_tokens_innerHTML;
            inputInitializer();
            betInput.placeholder = 'Kenny can place once only';
        }
        else {
            inputInitializer();
            betInput.placeholder = "Kenny can't carry that much!";
            count_for_input = 0;
        }
    }

    else {
        betInput.placeholder = "Don't be mean";
        inputInitializer();
    }
}

function spin() {

    if (tokensAmount > 9) {
        hightLightRemover();
        tokensAmount -= 10;
        tokens.innerHTML = sixDigit(tokensAmount);
        for (let index = 0; index < imageTags.length; index++) {
            spinResults[index] = imagesObjArray[Math.floor(Math.random() * imagesObjArray.length)].image;
        }
        setImageToRoller(spinResults);

        if (tokensAmount >= 1000) {
            initialize();
            betInput.placeholder = 'YOU WIN!';
            tokens.innerHTML = "CONGRATS!";
            roller.removeEventListener('click', spin);
        }
    }
    else {
        betInput.placeholder = "No tokens left, you lose!";
        tokens.innerHTML = "LOSE";
    }
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
                tokensAmount += 100;
                tokens.innerHTML = sixDigit(tokensAmount);
                w1.style.background = 'yellow';
                w1.style.color = 'blue';
            }
            else if (key == "img/kyle.png") {
                kyle_audio.play();
                tokensAmount += 200;
                tokens.innerHTML = sixDigit(tokensAmount);
                w3.style.background = 'yellow';
                w3.style.color = 'blue';
            }
            else if (key == "img/satan.png") {
                satan_audio.play()
                tokensAmount = Math.floor(tokensAmount * 0.4);
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
    return ("00000" + number).slice(-6);
}

function hightLightRemover() {
    for (i = 0; i < hightlightArr.length; i++) {
        hightlightArr[i].style = null;
    }
}