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
        alert('Registration form එක ළඟදීම website එකට add කරනවා. සූදානමින් ඉන්න!');
    });
})

// Mobile Hamburger Menu Toggle Script
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navBar = document.getElementById('nav-menu');

    if (mobileMenuBtn && navBar) {
        mobileMenuBtn.addEventListener('click', function () {
            navBar.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navBar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        const navLinks = navBar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navBar.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});

// Slider Logic
let slideIndex = 0;
let autoSlide = setInterval(function() {
    moveSlide(1);
}, 4000);

function moveSlide(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }
    
    slides[slideIndex].style.display = "block";
    slides[slideIndex].classList.add("active");
}

function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(function() {
        moveSlide(1);
    }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
    showSlides(slideIndex);
});

// --- Fixed Typing Effect Script ---
document.addEventListener("DOMContentLoaded", function () {
    const typedTextSpan = document.querySelector(".typed-text");
    
    if (!typedTextSpan) return; // typed-text එක නැත්නම් කෝඩ් එක නවත්වයි

    const textArray = [
        "PROVE YOUR SKILLS IN FREE FIRE TOURNAMENTS",
        "JOIN SRI LANKA'S PREMIER ESPORTS",
        "WIN MASSIVE CASH PRIZES DAILY"
    ];
    const typingDelay = 100;    
    const erasingDelay = 50;    
    const newTextDelay = 2000;  
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
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

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }
});