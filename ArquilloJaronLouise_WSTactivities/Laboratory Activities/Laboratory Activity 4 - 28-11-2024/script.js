const player = document.getElementById('player');
const gameContainer = document.getElementById('gameContainer');
const zones = document.querySelectorAll('.info-zone');
const tutorialTooltip = document.getElementById('tutorial-tooltip');
const starfield = document.getElementById('starfield');
const welcomeHeader = document.getElementById('welcome-header');

function createStarfield() {
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starfield.appendChild(star);
    }
}

function createPlanets() {
    const planetsData = [
        { class: 'planet1', size: '80px', left: '10%', top: '20%' },
        { class: 'planet2', size: '60px', left: '70%', top: '30%' },
        { class: 'planet3', size: '40px', left: '50%', top: '70%' }
    ];

    planetsData.forEach(data => {
        const planet = document.createElement('div');
        planet.classList.add('planet', data.class);
        planet.style.width = data.size;
        planet.style.height = data.size;
        planet.style.left = data.left;
        planet.style.top = data.top;
        gameContainer.appendChild(planet);
    });
}

const playerSpeed = 5;
let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;
let headerVisible = true;

const alienMessages = [
    "So empty...",
    "Draa'vokas hin'zol!",
    "Human. Don't move me around.",
    "Where is Earth?",
    "Zorth iknor el'Thah!",
    "beep-boop-beepppp",
    "Thrusters online",
    "Haa'thin drakar, K'aaloth!"
];

function displayAlienMessage() {
    const message = alienMessages[Math.floor(Math.random() * alienMessages.length)];
    const alienMessageElement = document.getElementById('alien-message');
    alienMessageElement.textContent = message;
    alienMessageElement.style.opacity = 1;
    const messageWidth = alienMessageElement.offsetWidth;
    const messageHeight = alienMessageElement.offsetHeight;
    alienMessageElement.style.left = `${playerX - messageWidth / 2}px`;
    alienMessageElement.style.top = `${playerY - messageHeight - 10}px`;
    setTimeout(() => {
        alienMessageElement.style.opacity = 0;
    }, 4000);
}

setInterval(displayAlienMessage, Math.random() * 5000 + 9000);

function showTutorial() {
    tutorialTooltip.textContent = "Use Arrow Keys to Explore";
    const tooltipWidth = tutorialTooltip.offsetWidth;
    const tooltipHeight = tutorialTooltip.offsetHeight;
    tutorialTooltip.style.left = `${playerX - tooltipWidth / 2}px`;
    tutorialTooltip.style.top = `${playerY - tooltipHeight - 10}px`;
    setTimeout(() => {
        tutorialTooltip.style.opacity = '0';
    }, 2000);
}

function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}

function checkZoneCollision() {
    zones.forEach(zone => {
        const zoneRect = zone.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        const collision = !(
            playerRect.right < zoneRect.left ||
            playerRect.left > zoneRect.right ||
            playerRect.bottom < zoneRect.top ||
            playerRect.top > zoneRect.bottom
        );
        zone.style.opacity = collision ? '1' : '0';
    });
}

document.addEventListener('keydown', (e) => {
    if (headerVisible) {
        welcomeHeader.style.opacity = '0';
        welcomeHeader.style.transform = 'translateY(-100%)';
        headerVisible = false;
    }
    switch(e.key) {
        case 'ArrowUp': 
            playerY = Math.max(0, playerY - playerSpeed);
            break;
        case 'ArrowDown': 
            playerY = Math.min(window.innerHeight - 50, playerY + playerSpeed);
            break;
        case 'ArrowLeft': 
            playerX = Math.max(0, playerX - playerSpeed);
            break;
        case 'ArrowRight': 
            playerX = Math.min(window.innerWidth - 50, playerX + playerSpeed);
            break;
    }
    updatePlayerPosition();
    checkZoneCollision();
    tutorialTooltip.style.left = `${playerX}px`;
    tutorialTooltip.style.top = `${playerY - 60}px`;
});

createStarfield();
createPlanets();
updatePlayerPosition();
showTutorial();
