
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
        let duration = Math.random() * 1.2;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        //length of star
        star.style.height = 60 + h + 'px';
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
    { name: 'goCows', image: 'img/goCows.png' },
    { name: 'jesus', image: 'img/jesus.png' },
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
// let win_audio = document.querySelector('#');
let body = document.querySelector('.chef-body');
let tokens = document.querySelector('#tokens');
const imageTags = document.querySelectorAll(".roller > img");  //object nodelist of image


//***********------------ EVENT LISTENER ------------************* */

betBtn.addEventListener('click', placeBet);
quitBtn.addEventListener('click', initialize);
roller.addEventListener('click', spin);
//Hello there children
body.addEventListener('click', function () {
    helloChildren_audio.play();
});


//***********------------ FUNCTIONS ------------************* */

initialize();

function initialize() {
    tokensAmount = 0;
    tokens.innerText = '000000';
    hightLightRemover();
    for (let index = 0; index < 3; index++) {
        imageTags[index].src = imagesObjArray[Math.floor(Math.random() * imagesObjArray.length)].image;
        imageTags[index].style.width = '81%';
    } inputInitializer()
}

function placeBet() {
    if (!isNaN(betInput.value) && betInput.value.length > 0) {
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
    //spin sound play;
    if (tokens.innerHTML > 0) {
        hightLightRemover();
        tokensAmount -= 10;
        tokens.innerHTML = sixDigit(tokensAmount);
        for (let index = 0; index < 3; index++) {
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
        }, t += 300);
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
    for (let index = 0; index < 3; index++) {
        hightlightArr[index].style = null;
    }
    console.log("hightLightRemover worked");
}