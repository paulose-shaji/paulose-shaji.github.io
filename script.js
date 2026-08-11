// --- 4. PROJECT & IMAGE MODAL LOGIC ---
const projectModal = document.getElementById('project-modal');
const closeProjectModal = document.querySelector('.close-modal');
const projectBtns = document.querySelectorAll('.view-project-btn');

// Project Modal Elements
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalGithub = document.getElementById('modal-github');
const modalOverview = document.getElementById('modal-overview');
const modalDashboard = document.getElementById('modal-dashboard');

// Image Gallery Modal Elements
const imageModal = document.getElementById('image-modal');
const closeImageModal = document.querySelector('.close-image-modal');
const galleryContainer = document.getElementById('image-gallery-container');

// Tracks which project is currently open
let currentProjectId = null;

// Project Data Dictionary (Now containing Image Arrays)
const projectData = {
    '1': {
        title: 'Uber Operations & KPI Monitoring',
        desc: 'Cleaned and transformed over 100,000 trip records using MS Excel and Power Query. Engineered an interactive Power BI dashboard featuring dynamic slicers and trend analysis to evaluate revenue patterns and customer booking behavior.',
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
        desc: 'Analyzed 48,000+ Airbnb listings using SQL to identify market trends and pricing distributions. Designed interactive Tableau dashboards with geographical mapping and dynamic filter controls to communicate actionable market insights.',
        githubLink: '#',
        overviewImages: [],
        dashboardImages: []
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
    e.preventDefault(); // Prevents it from acting like a normal link
    openImageGallery(projectData[currentProjectId].overviewImages);
});

// Handle Dashboard Button Click
modalDashboard.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents it from acting like a normal link
    openImageGallery(projectData[currentProjectId].dashboardImages);
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