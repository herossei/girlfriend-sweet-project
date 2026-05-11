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

// Limiter
let Counter = 0;
const MaxCounter = 300; // Maximum number of images to spawn

function spawn() {
    images.forEach((image) => {
        if (Counter >= MaxCounter) return; // Stop spawning if we've reached the limit
        Counter++;

        const imgTemplate = document.createElement('img');

        // 2. Set the source (make sure this path leads to your folder)
        imgTemplate.src = image;

        const img = imgTemplate.cloneNode(); // Clone the template for each image

        // 1. Random Position
        const initX = Math.random() * window.innerWidth;
        const initY = Math.random() * window.innerHeight;
        img.style.left = initX + 'px';
        img.style.top = initY + 'px';

        img.classList.add('bg-image'); // Add a class for styling

        bgElement.appendChild(img);
    });
};

setInterval(spawn, 100); // Spawn new images every 5 seconds


