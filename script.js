// Theme and Language Toggle Functionality
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.language-toggle');
const themeIcon = themeToggle.querySelector('i');

// Load saved preferences
const savedTheme = localStorage.getItem('theme') || 'light';
const savedLanguage = localStorage.getItem('language') || 'en';
body.setAttribute('data-theme', savedTheme);
body.setAttribute('data-language', savedLanguage);
updateThemeIcon(savedTheme);
updateContent(savedLanguage);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Language toggle event listener
languageToggle.addEventListener('click', () => {
    const currentLanguage = body.getAttribute('data-language');
    const newLanguage = currentLanguage === 'en' ? 'ka' : 'en';
    
    body.setAttribute('data-language', newLanguage);
    localStorage.setItem('language', newLanguage);
    updateContent(newLanguage);
});

// Update theme icon
function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Update content based on selected language
function updateContent(language) {
    const content = translations[language];
    
    // Update name and title
    document.querySelector('h1').textContent = content.name;
    document.querySelector('.title').textContent = content.title;
    
    // Update About Me section
    document.querySelector('#about-me-heading').textContent = content.aboutMe;
    document.querySelectorAll('.about-me-section .skill').forEach(skill => {
        const name = skill.querySelector('.skill-name');
        const text = skill.querySelector('.proficiency-text');
        
        if (name.textContent === 'City' || name.textContent === 'ქალაქი') {
            name.textContent = content.city;
            text.textContent = content.cityValue;
        } else if (name.textContent === 'Age' || name.textContent === 'ასაკი') {
            name.textContent = content.age;
            text.textContent = content.ageValue;
        } else if (name.textContent === 'Birth Date' || name.textContent === 'დაბადების თარიღი') {
            name.textContent = content.birthDate;
            text.textContent = content.birthDateValue;
        } else if (name.textContent === 'Nationality' || name.textContent === 'ეროვნება') {
            name.textContent = content.nationality;
            text.textContent = content.nationalityValue;
        }
    });
    
    // Update tab buttons
    document.querySelector('#languages-tab').textContent = content.languages;
    document.querySelector('#programming-skills-tab').textContent = content.programmingSkills;
    
    // Update language skills
    const languageSkills = {
        'Georgian': ['georgian', 'nativeProficient'],
        'English': ['english', 'nativeProficient'],
        'German': ['german', 'intermediate'],
        'Russian': ['russian', 'beginner'],
        'ქართული': ['georgian', 'nativeProficient'],
        'ინგლისური': ['english', 'nativeProficient'],
        'გერმანული': ['german', 'intermediate'],
        'რუსული': ['russian', 'beginner']
    };
    
    document.querySelectorAll('#languages-panel .skill').forEach(skill => {
        const name = skill.querySelector('.skill-name');
        const text = skill.querySelector('.proficiency-text');
        const currentLang = name.textContent;
        if (languageSkills[currentLang]) {
            const [langKey, levelKey] = languageSkills[currentLang];
            name.textContent = content[langKey];
            text.textContent = content[levelKey];
        }
    });
    
    // Update programming skills
    document.querySelectorAll('#programming-skills-panel .skill').forEach(skill => {
        const text = skill.querySelector('.proficiency-text');
        if (text.textContent === 'Expert' || text.textContent === 'ექსპერტი') {
            text.textContent = content.expert;
        } else if (text.textContent === 'Advanced' || text.textContent === 'მოწინავე') {
            text.textContent = content.advanced;
        }
    });
    
    // Update section headings
    document.querySelector('#experience-heading').textContent = content.experience;
    document.querySelector('#education-heading').textContent = content.education;
    
    // Update experience cards
    const experienceCards = document.querySelectorAll('.experience-section .card');
    const experienceTitles = [
        ['customerServiceSpecialist', 'customerServiceDesc'],
        ['socialMediaManager', 'socialMediaDesc'],
        ['marketingManager', 'marketingDesc'],
        ['analyst', 'analystDesc'],
        ['freelanceWebDev', 'webDevDesc']
    ];
    
    experienceCards.forEach((card, index) => {
        if (experienceTitles[index]) {
            const [titleKey, descKey] = experienceTitles[index];
            card.querySelector('h3').textContent = content[titleKey];
            card.querySelector('.company').textContent = content.company;
            card.querySelector('.period').textContent = content.period;
            card.querySelector('p:last-child').textContent = content[descKey];
        }
    });
    
    // Update education cards
    const educationCards = document.querySelectorAll('.education-section .card');
    const educationInfo = [
        {
            title: 'bba',
            institution: 'newVision',
            period: 'periodBBA'
        },
        {
            title: 'cs50',
            institution: 'harvard',
            period: 'periodCS50',
            desc: 'cs50Desc'
        },
        {
            title: 'quantum',
            institution: 'stanford',
            period: 'periodQuantum',
            desc: 'quantumDesc'
        },
        {
            title: 'secondary',
            institution: 'school',
            period: 'periodSchool',
            desc: 'goldMedalist'
        }
    ];
    
    educationCards.forEach((card, index) => {
        const info = educationInfo[index];
        if (info) {
            card.querySelector('h3').textContent = content[info.title];
            card.querySelector('.institution').textContent = content[info.institution];
            card.querySelector('.period').textContent = content[info.period];
            if (info.desc) {
                const descElement = card.querySelector('p:last-child');
                if (descElement) {
                    descElement.textContent = content[info.desc];
                }
            }
        }
    });
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

const downloadToggle = document.querySelector('.download-toggle');

downloadToggle.addEventListener('click', async () => {
    const files = ['index.html', 'styles.css', 'script.js', 'translations.js'];
    const zip = new JSZip();

    for (const file of files) {
        const response = await fetch(file);
        const content = await response.text();
        zip.file(file, content);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'website-source.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
});