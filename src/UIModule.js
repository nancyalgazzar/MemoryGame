import { DEFAULTIMG, FlipHandler, audiostartTime, reset } from "./GameModule.js";
function buildGame() {
    let table = document.createElement("table");
    let image, row;
    for (let i = 0; i < 3; i++) {
        row = document.createElement("tr");
        for (let j = 0; j < 4; j++) {
            image = document.createElement("img");
            image.src = DEFAULTIMG;
            image.height = 200;
            image.className = "col-12 col-md-6 col-lg-3";
            row.appendChild(image);
        }
        table.appendChild(row);
    }
    table.id = "gameflex";
    document.body.appendChild(table);
}
function buildModal() {
    let button = document.createElement("button");
    button.type = "button";
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#staticBackdrop");
    button.id = "ModalBtn";
    button.hidden = true;
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "staticBackdrop";
    modal.setAttribute("data-bs-backdrop", "static");
    modal.setAttribute("data-bs-keyboard", "false");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "staticBackdropLabel");
    modal.setAttribute("aria-hidden", "true");
    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";
    let modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    let modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    let title = document.createElement("h1");
    title.className = "modal-title fs-5";
    title.id = "staticBackdropLabel";
    title.innerText = "Congratulations";
    modalHeader.appendChild(title);
    let modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    let closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn btn-secondary";
    closeBtn.setAttribute("data-bs-dismiss", "modal");
    closeBtn.innerText = "Close";
    let PlayBtn = document.createElement("button");
    PlayBtn.type = "button";
    PlayBtn.className = "btn bg-success";
    PlayBtn.innerText = "Play Again?";
    PlayBtn.id = "playAgain";
    PlayBtn.setAttribute("data-bs-dismiss", "modal");
    PlayBtn.onclick = function () { reset(); };
    modalFooter.appendChild(closeBtn);
    modalFooter.appendChild(PlayBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    document.body.appendChild(button);
    document.body.appendChild(modal);
}
function progressBar() {
    //  <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0"
    //     aria-valuemax="100">
    //     <div class="progress-bar text-bg-success" style="width: 0%">0%</div>
    // </div>
    let div1 = document.createElement("div");
    div1.className = "progress";
    div1.role = "progressbar";
    div1.ariaLabel = "Success example";
    div1.ariaValueMin = "0";
    div1.ariaValueMax = "100";
    let div2 = document.createElement("div");
    div2.className = "progress-bar text-bg-success";
    div2.style.width = "0%";
    div2.id = "progress";
    div2.textContent = "0%";
    div1.appendChild(div2);
    document.body.prepend(div1);
}
const audioPath = "./Audio/clapAudio.mp3";
function addAudio() {
    // <audio src="./Audio/clapAudio.mp3" autoplay></audio>
    let audio = new Audio(audioPath);
    audio.currentTime = audiostartTime;
    audio.id = "successAudio";
    document.body.appendChild(audio);
}
function Style() {
    let style = document.createElement("link");
    style.href = "src/style.css";
    style.rel = "stylesheet";
    document.head.appendChild(style);
}
export function MemGame() {
    buildModal();
    buildGame();
    progressBar();
    addAudio();
    Style();
    FlipHandler();
}
MemGame();
