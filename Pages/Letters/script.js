// Global code
let State = "None"
let CurrentEnvelope;

// Letters code

const Letters = document.querySelectorAll(".Letter")

const Envelopes = {
    ["Closed"]: "Images/Pink-Closed-Envelope.png",
    ["Opened"]: "Images/Pink-Opened-Envelope.png",
    ["Empty"]: "Images/Pink-Empty-Envelope.png"

};

// Randomize correct letter
const min = 0;
const max = Letters.length;

// Formula to include both min and max
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

// Letter content
const content = document.getElementById("letter-content");

const WinText = document.getElementById("Holder-Content").innerHTML;
const clickSFX = new Audio("Audio/Click sound.mp3");
const winSFX = new Audio("Audio/Win.mp3");
Letters.forEach((letter, index) => {
    letter.setAttribute("State", "Idle");
    if (index === randomNumber) {
        letter.setAttribute("Correct", true);
    } else {
        letter.setAttribute("Correct", false);
    }
    letter.addEventListener("click", () => {
        if (State === "Viewing") {
            return
        }

        // Play sound efect
        clickSFX.play();
        if (letter.getAttribute("Correct") == "true") {
            winSFX.play();
            content.innerHTML = WinText
        } else {
            content.innerText = "Keep looking!!!";
        }
        if (State === "Viewing") {
            return
        };

        if (letter.getAttribute("State") && letter.getAttribute("State") !== "Opened") {
            letter.src = Envelopes["Opened"];
        };

        ModalElement.classList.remove("Hide");
        ModalElement.classList.add("Show");
        State = "Viewing";

        CurrentEnvelope = letter;
    });
});


// Modal code

const ModalElement = document.getElementById("Modal");
const CloseButton = document.getElementById("Close-Button");
const AudioElement = document.getElementById("Audio");

let firstCache = false;

CloseButton.addEventListener("click", () => {
    if (!firstCache) {
        firstCache = true;
        AudioElement.play();
    }
    ModalElement.classList.remove("Show")
    ModalElement.classList.add("Hide");

    State = "None";
    if (CurrentEnvelope) {
        CurrentEnvelope.src = Envelopes["Empty"];
        CurrentEnvelope.setAttribute('State', 'Opened');
    }
})





// RAIN CODE

const ImageRain = document.getElementById("ImageRain");

const Images = [
    "Images/Flower_1.jpg",
    "Images/Heart_2.jpg",
    "Images/Heart_3.jpg",
    "Images/Heart_1.jpg",
    "Images/Interuption_1.jpg",
    "Images/Interruption_2.jpg",
    "Images/Many_hearts_1.jpg",
    "Images/random_designs_1.jpg",
];

const Settings = {
    // How many milliseconds between spawns
    SpawnRate: 100,

    // Falling speed (seconds)
    MinFallTime: 2,
    MaxFallTime: 7,

    // Image size
    MinSize: 40,
    MaxSize: 80,

    // Horizontal drift (pixels)
    DriftAmount: 0,

    // Maximum images on screen
    MaxImages: 100
};

let ActiveImages = 0;

function SpawnImage() {

    if (ActiveImages >= Settings.MaxImages) return;

    const Image = document.createElement("img");

    Image.src =
        Images[Math.floor(Math.random() * Images.length)];

    const Size =
        Math.random() *
        (Settings.MaxSize - Settings.MinSize) +
        Settings.MinSize;

    const Duration =
        Math.random() *
        (Settings.MaxFallTime - Settings.MinFallTime) +
        Settings.MinFallTime;

    Image.classList.add("rain-image");

    Image.style.left =
        Math.random() * window.innerWidth + "px";

    Image.style.width = Size + "px";

    Image.style.setProperty(
        "--drift",
        `${Settings.DriftAmount}px`
    );

    Image.style.animationDuration =
        `${Duration}s`;

    ImageRain.appendChild(Image);

    ActiveImages++;

    Image.addEventListener("animationend", () => {
        ActiveImages--;
        Image.remove();
    });
}

setInterval(SpawnImage, Settings.SpawnRate);