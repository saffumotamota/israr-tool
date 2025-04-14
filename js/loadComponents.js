// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/header.html');
    loadComponent('footer', '/components/footer.html');
}); 