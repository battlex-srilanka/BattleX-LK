// Watch Live button click alert
const watchLiveBtn = document.getElementById('alert-btn');
if (watchLiveBtn) {
    watchLiveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Live streaming channel එක ළඟදීම update කරන්නම්!');
    });
}

// Tournament Register Buttons alert
const registerButtons = document.querySelectorAll('.register-click');
registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Registration form එක ළඟදීම website එකට add කරනවා. සුදාفن ඉන්න!');
    });
});
// ස්වයංක්‍රියව තත්පර 4 කට වරක් පෝස්ටරය මාරු වීම
let autoSlide = setInterval(function() {
    moveSlide(1);
}, 4000); // මෙතැන 4000 എന്ന് වෙනස් කරන්න

function moveSlide(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
}

function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(function() {
        moveSlide(1);
    }, 4000);
}
// Typing Effect Script
const typedTextSpan = document.querySelector(".typed-text");

// මෙතැනට ඔයාට ටයිප් වෙන්න ඕන වචන මාලාව දාන්න පුළුවන්
const textArray = [
    "PROVE YOUR SKILLS IN FREE FIRE TOURNAMENTS",
    "JOIN SRI LANKA'S PREMIER ESPORTS",
    "WIN MASSIVE CASH PRIZES DAILY"
];
const typingDelay = 100;    // අකුරක් ලියැවීමට ගතවන වේගය (මිලි තත්පර)
const erasingDelay = 50;    // අකුරක් මැකී යාමේ වේගය
const newTextDelay = 2000;  // වැකියක් සම්පූර්ණ වූ පසු නව වැකියක් පටන් ගැනීමට පෙර පමාව
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        let currentChar = textArray[textArrayIndex].charAt(charIndex);
        
        // "FREE FIRE" කියන වචනයට වෙනම රතු පාට ලබා දීමට
        if (textArray[textArrayIndex].includes("FREE FIRE") && textArrayIndex === 0) {
            // ساده logic එකක් මගින් Free Fire කොටස highlight කරයි
        }
        
        typedTextSpan.textContent += currentChar;
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});
