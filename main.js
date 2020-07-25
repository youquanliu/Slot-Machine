
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
const imagesObj = [
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

let tokens;
let spinResults = [];

//***********------------ REFERENCES ------------************* */

let betInput = document.querySelector('#betInput');
let betBtn = document.querySelector('#betBtn');
let roller = document.querySelector('#spinner-section');
let quitBtn = document.querySelector('#quit');
let helloChildren_audio = document.getElementById('helloChildren');
// let win_audio = document.querySelector('#');
let body = document.querySelector('.chef-body');
/* * * * * * * * * * * EVENT LISTENERS * * * * * * * * * * * */

body.addEventListener('click', function () {
    helloChildren_audio.play();
    console.log("h")
}); 
