// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchTools');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
});

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const toolsContainer = document.getElementById('tools-container');
    const tools = toolsContainer.getElementsByClassName('col-md-4');

    Array.from(tools).forEach(toolCard => {
        const toolName = toolCard.querySelector('.card-title').textContent.toLowerCase();
        const toolDescription = toolCard.querySelector('.card-text').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm)) {
            toolCard.style.display = '';
        } else {
            toolCard.style.display = 'none';
        }
    });

    // Update category visibility based on visible tools
    updateCategoryVisibility();
}

// Update category visibility based on search results
function updateCategoryVisibility() {
    const categories = document.querySelectorAll('.category-section');
    categories.forEach(category => {
        const tools = category.querySelectorAll('.col-md-4');
        const visibleTools = Array.from(tools).filter(tool => tool.style.display !== 'none');
        
        if (visibleTools.length === 0) {
            category.style.display = 'none';
        } else {
            category.style.display = '';
        }
    });
} 