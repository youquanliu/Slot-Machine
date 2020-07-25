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