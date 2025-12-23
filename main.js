// Aktuální téma
let currentTheme = 0;
const themes = ['theme-green', 'theme-blue', 'theme-yellow'];
const themeNames = ['Zelená', 'Modrá', 'Žlutá'];

// Aktuální svítivost hodin - zablokována
let brightness = 2.0; // pevná normální svítivost
const minBrightness = 2.0;
const maxBrightness = 2.0;

// Vertikální pozice hodin - zablokováno
let verticalPosition = 0; // pevně na středu
const maxPosition = 0;
const minPosition = 0;

// Aktuální velikost hodin
let clockSize = 15; // v rem jednotkách
const minSize = 5;
const maxSize = 30;

// Funkce pro posun nahoru a dolů
function moveUp() {
    if (verticalPosition > minPosition) {
        verticalPosition -= 50;
        updatePosition();
        console.log(`Posun nahoru: ${verticalPosition}px`);
    }
}

function moveDown() {
    if (verticalPosition < maxPosition) {
        verticalPosition += 50;
        updatePosition();
        console.log(`Posun dolů: ${verticalPosition}px`);
    }
}

function updatePosition() {
    const clockElement = document.querySelector('.clock');
    clockElement.style.setProperty('--vertical-position', verticalPosition + 'px');
}

// Funkce pro změnu svítivosti
function increaseSize() {
    if (brightness < maxBrightness) {
        brightness += 0.2;
        updateBrightness();
        console.log(`Svítivost zvýšena na: ${brightness.toFixed(1)}`);
    }
}

function decreaseSize() {
    if (brightness > minBrightness) {
        brightness -= 0.2;
        updateBrightness();
        console.log(`Svítivost snížena na: ${brightness.toFixed(1)}`);
    }
}

function updateBrightness() {
    const timeElement = document.getElementById('time');
    timeElement.style.setProperty('--brightness', brightness);
}

function updateClockSize() {
    const timeElement = document.getElementById('time');
    timeElement.style.setProperty('--clock-size', clockSize + 'rem');
}

// Funkce pro změnu tématu
function changeTheme() {
    // Odebrání aktuálního tématu
    document.body.classList.remove(themes[currentTheme]);
    
    // Přechod na další téma
    currentTheme = (currentTheme + 1) % themes.length;
    
    // Přidání nového tématu
    document.body.classList.add(themes[currentTheme]);
    
    // Aktualizace textu tlačítka
    const btn = document.getElementById('themeBtn');
    btn.textContent = `Ciferník: ${themeNames[currentTheme]}`;
    
    console.log(`Přepnuto na: ${themeNames[currentTheme]}`);
}

// Funkce pro aktualizaci času
function updateTime() {
    const now = new Date();
    
    // Získání hodin, minut a sekund
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Přidání nuly před jednociferná čísla
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    // Formátování času
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Zobrazení času
    document.getElementById('time').textContent = timeString;
    
    // Získání a formátování data
    const day = now.getDate();
    const month = now.getMonth() + 1; // Měsíce jsou indexované od 0
    const year = now.getFullYear();
    
    // Přidání nuly před jednociferná čísla
    const dayStr = day < 10 ? '0' + day : day;
    const monthStr = month < 10 ? '0' + month : month;
    
    // Formátování data
    const dateString = `${dayStr}.${monthStr}.${year}`;
    
    // Zobrazení data
    document.getElementById('date').textContent = dateString;
}

// Hlavní funkce pro aktualizaci hodin
function updateClock() {
    updateTime();
}

// Spuštění hodin při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    // Nastavení výchozího tématu
    document.body.classList.add(themes[currentTheme]);
    document.getElementById('themeBtn').textContent = `Ciferník: ${themeNames[currentTheme]}`;
    
    // Okamžitá aktualizace
    updateClock();
    
    // Aktualizace každou sekundu
    setInterval(updateClock, 1000);
    
    console.log('Stabilní digitální hodiny spuštěny!');
});
