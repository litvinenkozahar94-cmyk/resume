const name = "Захар Литвиненко";
document.getElementById("header-name").textContent = name;

const currentYear = new Date().getFullYear();
document.getElementById("footer-year").textContent = currentYear;

const themeButton = document.getElementById("theme-toggle");
let isDarkMode = false;

themeButton.addEventListener("click", function() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");
    if (isDarkMode) {
        themeButton.textContent = "Змінити на світлу тему";
    } else {
        themeButton.textContent = "Змінити на темну тему";
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const projectTriggers = document.querySelectorAll('.project-trigger');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-button');

projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rainbow-canvas');
    const ctx = canvas.getContext('2d');
    const button = document.getElementById('theme-toggle');
    
    let hue = 0;
    let animationRef = null;
    const borderWidth = 3;

    function setupCanvas() {
        const btnRect = button.getBoundingClientRect();
        
        canvas.width = btnRect.width + (borderWidth * 2);
        canvas.height = btnRect.height + (borderWidth * 2);
        
        canvas.style.top = `-${borderWidth}px`;
        canvas.style.left = `-${borderWidth}px`;
    }

    function drawRainbowBorder() {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = borderWidth;

        const gradient = ctx.createConicGradient((hue * Math.PI) / 180, width / 2, height / 2);
        
        gradient.addColorStop(0, "hsl(0, 100%, 50%)");
        gradient.addColorStop(0.16, "hsl(60, 100%, 50%)");
        gradient.addColorStop(0.33, "hsl(120, 100%, 50%)");
        gradient.addColorStop(0.5, "hsl(180, 100%, 50%)");
        gradient.addColorStop(0.66, "hsl(240, 100%, 50%)");
        gradient.addColorStop(0.83, "hsl(300, 100%, 50%)");
        gradient.addColorStop(1, "hsl(360, 100%, 50%)");

        ctx.strokeStyle = gradient;
        
        ctx.beginPath();
        ctx.roundRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, 8);
        ctx.stroke();

        hue = (hue + 1) % 360;
        animationRef = requestAnimationFrame(drawRainbowBorder);
    }

    setupCanvas();
    drawRainbowBorder();
    
    window.addEventListener('resize', setupCanvas);

    const card = document.querySelector('.resume-card');
    const profilePhoto = document.getElementById('profile-photo');
    const headerText = document.querySelector('.header-text');
            
    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        // Parallax Scroll Effect
        let lastScrollY = window.scrollY;
        function handleParallaxScroll() {
            const scrollY = window.scrollY;
            const deltaScroll = scrollY - lastScrollY;
            
            // Рухаємо фотографію трохи вгору/вниз
            profilePhoto.style.transform = `translateY(${scrollY * 0.15}px)`;
            
            // Рухаємо заголовок трохи вгору/вниз
            headerText.style.transform = `translateY(${scrollY * 0.08}px)`;

            lastScrollY = scrollY;
            requestAnimationFrame(handleParallaxScroll);
        }

        requestAnimationFrame(handleParallaxScroll);
    }
});
