// Tools categories and their icons
const categories = [
    { id: 'image-tools', name: 'Image Tools', icon: 'fa-image' },
    { id: 'seo-tools', name: 'SEO Tools', icon: 'fa-search' },
    { id: 'text-tools', name: 'Text Tools', icon: 'fa-font' },
    { id: 'dev-tools', name: 'Developer Tools', icon: 'fa-code' },
    { id: 'calculators', name: 'Calculators', icon: 'fa-calculator' },
    { id: 'converters', name: 'Converters', icon: 'fa-exchange-alt' },
    { id: 'security', name: 'Security Tools', icon: 'fa-shield-alt' },
    { id: 'social-media', name: 'Social Media', icon: 'fa-share-alt' }
];

// Function to create a tool card
function createToolCard(tool) {
    return `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <div class="text-center mb-3">
                        <i class="fas ${tool.icon} fa-2x text-primary"></i>
                    </div>
                    <h5 class="card-title text-center">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                </div>
                <div class="card-footer text-center">
                    <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `;
}

// Function to create a category card
function createCategoryCard(category) {
    return `
        <div class="col-md-3 col-sm-6 mb-4">
            <div class="card h-100 text-center">
                <div class="card-body">
                    <i class="fas ${category.icon} fa-3x text-primary mb-3"></i>
                    <h5 class="card-title">${category.name}</h5>
                </div>
                <div class="card-footer">
                    <a href="#${category.id}" class="btn btn-outline-primary btn-sm">View Tools</a>
                </div>
            </div>
        </div>
    `;
}

// Function to initialize the page
function initializePage() {
    // Render categories
    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories.map(category => createCategoryCard(category)).join('');
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 