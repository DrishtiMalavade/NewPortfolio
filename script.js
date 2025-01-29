document.addEventListener('DOMContentLoaded', () => {
    // Theme Switcher Setup
    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    if (themeSwitch) {
        // Check for saved theme preference or default to dark theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeUI(savedTheme);

        themeSwitch.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
            console.log('Theme switched to:', newTheme); // Debug log
        });
    }

    function updateThemeUI(theme) {
        if (!themeIcon || !themeText) return;
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = '';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = '';
        }
    }
});

// Single Custom Cursor Setup
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

// Function to update cursor position and appearance
document.addEventListener('mousemove', (e) => {
    // Update cursor position
    cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
    
    // Check for proximity to any clickable elements
    let isNearLink = false;
    
    // Select all links, social icons, and theme switch
    const clickableElements = document.querySelectorAll('a, .social-icon, .theme-switch');
    
    clickableElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        
        // Calculate if cursor is within the element's bounds or near it
        const isNear = 
            e.clientX >= rect.left - 20 && 
            e.clientX <= rect.right + 20 && 
            e.clientY >= rect.top - 20 && 
            e.clientY <= rect.bottom + 20;
            
        if (isNear) {
            isNearLink = true;
        }
    });
    
    // Update cursor appearance
    if (isNearLink) {
        cursor.style.width = '60px';
        cursor.style.height = '60px';
        cursor.style.backgroundColor = '#d14171';
        cursor.style.opacity = '0.7';
    } else {
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.backgroundColor = '#643843';
        cursor.style.opacity = '1';
    }
});

// Prevent cursor from disappearing when mouse leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});

// Add touch device detection
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
}

