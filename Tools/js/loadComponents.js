// Function to load HTML components
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component from ${url}:`, error);
    }
}

// Load header and footer when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('components/header.html', 'header-placeholder');
    loadComponent('components/footer.html', 'footer-placeholder');
}); 