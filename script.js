// --- 1. NAVBAR TRANSPARENCY ON SCROLL ---
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    // If scrolled past 50px, apply the frosted glass effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. MOBILE HAMBURGER MENU LOGIC ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close menu when a link is clicked (Mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// --- 3. SCROLL SPY LOGIC (HIGHLIGHT NAV ON SCROLL) ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    // Loop through each section to find which one is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // When we scroll past a third of the section, trigger the highlight
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Remove active class from all links, then add to the current one
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 4. PROJECT & IMAGE MODAL LOGIC ---
const projectModal = document.getElementById('project-modal');
const closeProjectModal = document.querySelector('.close-modal');
const projectBtns = document.querySelectorAll('.view-project-btn');

// Project Modal Elements
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGithub = document.getElementById('modal-github');
const modalOverview = document.getElementById('modal-overview');
const modalThirdBtn = document.getElementById('modal-third-btn');
const modalThirdText = document.getElementById('modal-third-text');

// Image Gallery Modal Elements
const imageModal = document.getElementById('image-modal');
const closeImageModal = document.querySelector('.close-image-modal');
const galleryContainer = document.getElementById('image-gallery-container');

// Tracks which project is currently open
let currentProjectId = null;

// Project Data Dictionary (Containing Image Arrays & Deployment Links)
const projectData = {
    '1': {
        title: 'Uber Operations & KPI Monitoring',
        desc: 'Cleaned and transformed over 100,000 trip records using MS Excel and Power Query, ensuring data integrity and automating KPI tracking workflows.',
        githubLink: 'https://github.com/paulose-shaji/uber-trip-analysis-powerbi', 
        overviewImages: ['uber markdown.png'], 
        dashboardImages: [
            'uber dashboard 1.png', 
            'uber dashboard 2.png', 
            'uber dashboard 3.png', 
            'uber dashboard 4.png'
        ] 
    },
    '2': {
        title: 'Interactive Airbnb Market Analytics',
        desc: 'Analyzed 48,000+ Airbnb listings using SQL to identify market trends, pricing distributions, and occupancy patterns across regions.',
        githubLink: 'https://github.com/paulose-shaji/Airbnb-NYC-Tableau-Analytics',
        overviewImages: ['airbnb markdown.png'],
        dashboardImages: ['airbnb dashboard.png']
    },
    '3': {
        title: 'Telecom Customer Churn Prediction',
        desc: 'An end-to-end Machine Learning application for predicting telecom customer churn and identifying high-risk customers. The system analyzes customer demographic, service, contract, and billing information using a deployed Logistic Regression model.',
        githubLink: 'https://github.com/paulose-shaji/Telecom-Customer-Churn-Prediction',
        overviewImages: ['customer churn markdown.png'],
        streamlitLink: 'https://telecom-customer-churn-prediction-paulose.streamlit.app/'
    }
};

// Open Project Modal
projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentProjectId = btn.getAttribute('data-id');
        const data = projectData[currentProjectId];

        // Inject the text and GitHub link
        modalTitle.innerText = data.title;
        modalDesc.innerText = data.desc;
        modalGithub.href = data.githubLink;

        // Configure third button dynamically based on project ID
        if (currentProjectId === '3') {
            modalThirdBtn.innerHTML = '<i class="fas fa-rocket"></i> Streamlit Deployment';
            modalThirdBtn.href = data.streamlitLink;
            modalThirdBtn.setAttribute('target', '_blank');
        } else {
            modalThirdBtn.innerHTML = '<i class="fas fa-chart-line"></i> Dashboard';
            modalThirdBtn.href = '#';
            modalThirdBtn.removeAttribute('target');
        }

        projectModal.classList.add('active');
    });
});

// Close Project Modal
closeProjectModal.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

// --- Function to Open the Image Gallery Popup ---
function openImageGallery(imageArray) {
    if (!imageArray || imageArray.length === 0) {
        alert('Images coming soon!');
        return;
    }
    
    galleryContainer.innerHTML = ''; // Clear previous images
    
    // Create and inject each image dynamically
    imageArray.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        galleryContainer.appendChild(img);
    });
    
    imageModal.classList.add('active');
}

// Handle Overview Button Click
modalOverview.addEventListener('click', (e) => {
    e.preventDefault(); 
    openImageGallery(projectData[currentProjectId].overviewImages);
});

// Handle Third Button Click (Dashboard gallery for 1 & 2, direct link for 3)
modalThirdBtn.addEventListener('click', (e) => {
    if (currentProjectId === '3') {
        // Allows direct opening of Streamlit app in a new tab
        projectModal.classList.remove('active');
    } else {
        e.preventDefault(); 
        openImageGallery(projectData[currentProjectId].dashboardImages);
    }
});

// Close Image Modal
closeImageModal.addEventListener('click', () => {
    imageModal.classList.remove('active');
});

// Close Modals when clicking the dark background area
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
    }
});

// --- 5. CONTACT FORM AJAX SUBMISSION ---
const contactForm = document.getElementById('contact-form');
const formSuccessMessage = document.getElementById('form-success-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        fetch('https://formsubmit.co/ajax/vspaulose2002@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(response => response.json())
        .then(data => {
            contactForm.style.display = 'none';
            formSuccessMessage.style.display = 'flex';
            formSuccessMessage.style.flexDirection = 'column';
            formSuccessMessage.style.justifyContent = 'center';
            formSuccessMessage.style.alignItems = 'center';
            formSuccessMessage.style.height = '100%';
        })
        .catch(error => {
            alert('Something went wrong! Please try again later.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
