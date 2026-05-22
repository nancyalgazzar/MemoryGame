const jsConfetti = new JSConfetti();
const arr = [
    "Images/panda1.svg",
    "Images/panda2.svg",
    "Images/panda3.svg",
    "Images/panda4.svg",
    "Images/panda5.svg",
    "Images/panda6.svg",
    "Images/panda1.svg",
    "Images/panda2.svg",
    "Images/panda3.svg",
    "Images/panda4.svg",
    "Images/panda5.svg",
    "Images/panda6.svg",
];
const progressStep = 100 / arr.length * 2;
export const DEFAULTIMG = "./Images/hidden.png";
export const audiostartTime = 18;
let matchCount = 0;
var states;
(function (states) {
    states[states["noCardSelected"] = 0] = "noCardSelected";
    states[states["CardSelected"] = 1] = "CardSelected";
    states[states["bothCardSelected"] = 2] = "bothCardSelected";
})(states || (states = {}));
let matchedcards = new Set();
let timer;
let firstIndex = -1, secondIndex = -1;
let firstImage;
let secondImage;
let currentState = states.noCardSelected;
export function FlipHandler() {
    let Images = document.images;
    for (let i = 0; i < Images.length; i++) {
        let image = Images[i];
        image.addEventListener("click", async () => {
            if (currentState == states.bothCardSelected)
                return;
            if (firstIndex == i)
                return;
            if (matchedcards.has(i))
                return;
            image.src = arr[i];
            if (currentState === states.CardSelected) {
                currentState = states.bothCardSelected;
                secondIndex = i;
                secondImage = image;
            }
            else if (currentState === states.noCardSelected) {
                firstImage = image;
                firstIndex = i;
                currentState = states.CardSelected;
                flipFirst();
            }
        });
    }
}
function matched() {
    matchCount++;
    let progress = document.getElementById("progress");
    if (progress) {
        let pro = parseFloat(progress.style.width || "0") + progressStep;
        progress.textContent = pro.toFixed(2) + "%";
        progress.style.width = pro + "%";
        if (pro > 90) {
            progress.textContent = 100 + "%";
            endGame();
        }
    }
}
function endGame() {
    let audio = document.getElementsByTagName("audio")[0];
    audio.currentTime = 0;
    timer = setInterval(() => { jsConfetti.addConfetti(); }, 1000);
    audio.play();
    document.getElementById("ModalBtn")?.click();
}
async function flipFirst() {
    let audio = document.getElementsByTagName("audio")[0];
    try {
        await createDelayPromise(2000);
        if (firstIndex >= 0 && secondIndex >= 0 && firstIndex != secondIndex && arr[firstIndex] == arr[secondIndex]) {
            matchedcards.add(firstIndex);
            matchedcards.add(secondIndex);
            audio.play();
            matched();
            if (matchCount < arr.length / 2) {
                await createDelayPromise(800);
                audio.pause();
                audio.currentTime = audiostartTime;
            }
        }
        else {
            if (firstIndex != -1)
                firstImage.src = DEFAULTIMG;
            if (secondIndex != -1)
                secondImage.src = DEFAULTIMG;
        }
        firstIndex = -1;
        secondIndex = -1;
        currentState = states.noCardSelected;
    }
    catch (error) {
        console.log(error);
    }
}
function createDelayPromise(time) {
    return new Promise((r) => {
        setTimeout(() => { r(""); }, time);
    });
}
export function reset() {
    currentState = states.noCardSelected;
    firstIndex = -1;
    secondIndex = -1;
    shuffle(arr);
    let images = document.images;
    for (let image of images) {
        image.src = DEFAULTIMG;
    }
    matchCount = 0;
    matchedcards.clear();
    document.getElementsByTagName("audio")[0].pause();
    clearInterval(timer);
    let progress = document.getElementById("progress");
    if (progress) {
        progress.style.width = 0 + '%';
    }
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}
;
