// Theme Toggle Functionality
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Keyboard accessibility for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
    }
});

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const panelId = button.getAttribute('aria-controls');
        document.getElementById(panelId).classList.add('active');

        // Update ARIA attributes
        tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
        button.setAttribute('aria-selected', 'true');

        // Trigger skill bar animations for the newly visible panel
        const visibleSkillBars = document.getElementById(panelId).querySelectorAll('.proficiency-level');
        visibleSkillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = `${level}%`;
        });
    });
});


// Trigger skill bar animations for all skill bars
const skillBars = document.querySelectorAll('.proficiency-level');
skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.width = `${level}%`;
});

// Skill Bars Animation
const skillLevels = document.querySelectorAll('.proficiency-level');

const animateSkillBar = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            entry.target.style.width = `${level}%`;
            observer.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBar, {
    threshold: 0.5
});

skillLevels.forEach(level => skillObserver.observe(level));

// Section Reveal Animation
const sections = document.querySelectorAll('section');
const container = document.querySelector('.container');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Reveal container immediately
container.style.opacity = '1';
container.style.transform = 'translateY(0)';

// Observe sections for reveal animation
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});