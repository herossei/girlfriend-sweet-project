const heartTemplate = document.getElementById('heartbg');
const maxHearts = 75;
let currentHearts = 0;

function createSingleHeart() {
    if (currentHearts >= maxHearts) return
    let heart = heartTemplate.cloneNode(true);
    heart.id = '';
    heart.classList.add('heart-instance'); // Use a unique class for clones

    // 1. Random Position
    const initX = Math.random() * window.innerWidth;
    const initY = Math.random() * window.innerHeight;
    heart.style.left = initX + 'px';
    heart.style.top = initY + 'px';

    // 2. Random Movement Values
    const moveX = (Math.random() - 0.5) * 400 + 'px';
    const moveY = (Math.random() - 0.5) * 400 + 'px';
    heart.style.setProperty('--move-x', moveX);
    heart.style.setProperty('--move-y', moveY);

    // 3. Add to DOM and Start Animation
    document.body.appendChild(heart);
    heart.classList.add('animate');
    heart.classList.add('heart-beating'); // Add heartbeat animation class
    currentHearts++;

    // 4. Cleanup
    heart.addEventListener('animationend', () => {
        heart.remove();
        currentHearts--;
    });
}

// Continuously spawn hearts
setInterval(() => {
    // Try to spawn 2 heart every 400ms
    for(let i = 0; i < 1; i++) {
        createSingleHeart();
    }
}, 100);
