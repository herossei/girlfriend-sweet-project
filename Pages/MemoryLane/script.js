const bgElement = document.getElementById("bg");
const images = [
    "Designs/Flower_1.jpg",
    "Designs/Heart_2.jpg",
    "Designs/Heart_3.jpg",
    "Designs/Heart_1.jpg",
    "Designs/Interuption_1.jpg",
    "Designs/Interruption_2.jpg",
    "Designs/Many_hearts_1.jpg",
    "Designs/random_designs_1.jpg",
];

// Keep track of total spawned images across calls
let Counter = 0;
const MaxCounter = 300; 

// Pass the desired amount into the function
function spawn(amountToSpawn) {
    amountToSpawn = amountToSpawn || 1; // Default to 5 if no argument is provided
    for (let i = 0; i < amountToSpawn; i++) {
        if (Counter >= MaxCounter) {
            console.log("Max limit reached!");
            break; 
        }
        Counter++;

        // Pick a random image from the array
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImageSrc = images[randomIndex];

        const img = document.createElement('img');
        img.src = randomImageSrc;

        // Random Position
        const initX = Math.random() * window.innerWidth;
        const initY = Math.random() * window.innerHeight;
        img.style.left = initX + 'px';
        img.style.top = initY + 'px';

        img.classList.add('bg-image'); 

        bgElement.appendChild(img);
    }
}

const StartButton = document.getElementById("Start-Button");

const BookElement = document.getElementById("Book");
const LoadingScreen = document.getElementById("Loading-Screen");
const MusicElement = document.getElementById("Music");
MusicElement.volume = 0.4;

StartButton.addEventListener("click", () => {
    MusicElement.play(); // Start the music
    setInterval(spawn, 50); // Spawn new images every 5 seconds

    // Show the book and hide the loading screen
    LoadingScreen.classList.add("fade-out");
    
    LoadingScreen.addEventListener("animationend", () => {
        LoadingScreen.classList.add("hide");
        BookElement.classList.add("show");
        BookElement.classList.add("fade-in");
    });
});




