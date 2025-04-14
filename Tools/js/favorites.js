// Favorites Management System
class FavoritesManager {
    constructor() {
        this.storageKey = 'toolFavorites';
        this.favorites = this.loadFavorites();
        this.initializeUI();
    }

    // Load favorites from localStorage
    loadFavorites() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }

    // Save favorites to localStorage
    saveFavorites() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
        this.updateUI();
    }

    // Add a tool to favorites
    addFavorite(toolId, toolName, toolIcon, toolUrl) {
        if (!this.favorites.find(f => f.id === toolId)) {
            this.favorites.push({
                id: toolId,
                name: toolName,
                icon: toolIcon,
                url: toolUrl,
                timestamp: Date.now()
            });
            this.saveFavorites();
            return true;
        }
        return false;
    }

    // Remove a tool from favorites
    removeFavorite(toolId) {
        const index = this.favorites.findIndex(f => f.id === toolId);
        if (index !== -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            return true;
        }
        return false;
    }

    // Check if a tool is favorited
    isFavorite(toolId) {
        return this.favorites.some(f => f.id === toolId);
    }

    // Initialize UI elements
    initializeUI() {
        // Add favorites dropdown to header
        const navbarNav = document.querySelector('.navbar-nav');
        if (navbarNav) {
            const favoritesDropdown = document.createElement('li');
            favoritesDropdown.className = 'nav-item dropdown';
            favoritesDropdown.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" id="favoritesDropdown" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-star text-warning"></i> Favorites
                    <span class="badge bg-warning text-dark" id="favoritesCount">0</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" id="favoritesList">
                    <li><div class="dropdown-header">No favorites yet</div></li>
                </ul>
            `;
            navbarNav.appendChild(favoritesDropdown);
        }

        // Add favorite buttons to tool cards
        document.querySelectorAll('.tool-card').forEach(card => {
            const toolId = card.dataset.toolId;
            const toolName = card.dataset.toolName;
            const toolIcon = card.dataset.toolIcon;
            const toolUrl = card.dataset.toolUrl;

            if (toolId) {
                const favoriteBtn = document.createElement('button');
                favoriteBtn.className = 'btn btn-link favorite-btn';
                favoriteBtn.innerHTML = `<i class="fas fa-star${this.isFavorite(toolId) ? ' text-warning' : ''}"></i>`;
                favoriteBtn.onclick = (e) => {
                    e.preventDefault();
                    this.toggleFavorite(toolId, toolName, toolIcon, toolUrl);
                };
                card.querySelector('.card-footer')?.appendChild(favoriteBtn);
            }
        });

        this.updateUI();
    }

    // Toggle favorite status
    toggleFavorite(toolId, toolName, toolIcon, toolUrl) {
        if (this.isFavorite(toolId)) {
            this.removeFavorite(toolId);
        } else {
            this.addFavorite(toolId, toolName, toolIcon, toolUrl);
        }

        // Update star icon
        document.querySelectorAll(`.tool-card[data-tool-id="${toolId}"] .favorite-btn i`)
            .forEach(icon => icon.classList.toggle('text-warning'));
    }

    // Update UI elements
    updateUI() {
        // Update favorites count
        const countBadge = document.getElementById('favoritesCount');
        if (countBadge) {
            countBadge.textContent = this.favorites.length;
        }

        // Update favorites dropdown
        const favoritesList = document.getElementById('favoritesList');
        if (favoritesList) {
            if (this.favorites.length === 0) {
                favoritesList.innerHTML = '<li><div class="dropdown-header">No favorites yet</div></li>';
            } else {
                favoritesList.innerHTML = this.favorites
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map(favorite => `
                        <li>
                            <a class="dropdown-item d-flex align-items-center" href="${favorite.url}">
                                <i class="${favorite.icon} me-2"></i>
                                ${favorite.name}
                                <button class="btn btn-link btn-sm ms-auto remove-favorite" 
                                        onclick="event.preventDefault(); favoritesManager.removeFavorite('${favorite.id}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            </a>
                        </li>
                    `).join('');
            }
        }

        // Update all favorite buttons
        document.querySelectorAll('.tool-card').forEach(card => {
            const toolId = card.dataset.toolId;
            if (toolId) {
                const starIcon = card.querySelector('.favorite-btn i');
                if (starIcon) {
                    starIcon.classList.toggle('text-warning', this.isFavorite(toolId));
                }
            }
        });
    }
}

// Initialize favorites manager when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.favoritesManager = new FavoritesManager();
}); 