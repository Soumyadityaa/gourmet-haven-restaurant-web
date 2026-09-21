/**
 * main.js - Core functionality for Global Theme, Navigation, and Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Theme Toggle Functionality
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme in localStorage
    const currentTheme = localStorage.getItem('theme');
    
    // Apply saved theme or default to dark (no class means dark based on CSS)
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Save preference to localStorage
        localStorage.setItem('theme', theme);
    });

    // ==========================================
    // Mobile Hamburger Menu Drawer
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and times (close)
        const icon = hamburgerBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerBtn.querySelector('i').classList.remove('fa-times');
            hamburgerBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // ==========================================
    // Sticky Header Effect
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'var(--shadow)';
        }
    });

    // ==========================================
    // Smooth Scroll for Internal Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});