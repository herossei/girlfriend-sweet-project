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

const WinText = `Hey babyyy you found the correct letterr sososoooo proud of uuuu. I did this to unite my passion for coding and my love for you. I just want to say na i love youu dearlyyyy and ayaw kong isipin mong may ibang nasa puso ko kasi ikaw lang ang aking tanging iniibig, iibigin, ibig. <strong style="color: gray;">The next passcode is 15</strong>`

Letters.forEach((letter, index) => {
    letter.setAttribute("State", "Idle");
    if (index === randomNumber) {
        letter.setAttribute("Correct", true);
    } else {
        letter.setAttribute("Correct", false);
    }
    letter.addEventListener("click", () => {
        if (letter.getAttribute("Correct") == "true") {
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

CloseButton.addEventListener("click", () => {
    ModalElement.classList.remove("Show")
    ModalElement.classList.add("Hide");

    State = "None";
    if (CurrentEnvelope) {
        CurrentEnvelope.src = Envelopes["Empty"];
        CurrentEnvelope.setAttribute('State', 'Opened');
    }
})