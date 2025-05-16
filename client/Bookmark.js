document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const bookmarksList = document.querySelector('.bookmarks-list');
    const addBookmarkBtn = document.querySelector('.add-bookmark-btn');
    const bookmarkModal = document.querySelector('.bookmark-modal');
    const addBookmarkForm = document.getElementById('addBookmarkForm');
    const searchInput = document.querySelector('.search-bar input');
    const viewButtons = document.querySelectorAll('.view-btn');

    // Initialize functionality
    function initialize() {
        setupEventListeners();
        setupSearch();
        setupViewToggle();
        setupBookmarkActions();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Add bookmark button
        if (addBookmarkBtn) {
            addBookmarkBtn.addEventListener('click', () => {
                if (bookmarkModal) {
                    bookmarkModal.style.display = 'flex';
                }
            });
        }

        // Modal close on outside click
        if (bookmarkModal) {
            bookmarkModal.addEventListener('click', (e) => {
                if (e.target === bookmarkModal) {
                    bookmarkModal.style.display = 'none';
                }
            });
        }

        // Add bookmark form
        if (addBookmarkForm) {
            addBookmarkForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addNewBookmark();
            });

            const cancelBtn = addBookmarkForm.querySelector('.cancel-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    bookmarkModal.style.display = 'none';
                });
            }
        }
    }

    // Setup search functionality
    function setupSearch() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const bookmarks = document.querySelectorAll('.bookmark-item');

                bookmarks.forEach(bookmark => {
                    const title = bookmark.querySelector('.bookmark-title').textContent.toLowerCase();
                    const url = bookmark.querySelector('.bookmark-url').textContent.toLowerCase();

                    if (title.includes(searchTerm) || url.includes(searchTerm)) {
                        bookmark.style.display = 'flex';
                    } else {
                        bookmark.style.display = 'none';
                    }
                });
            });
        }
    }

    // Setup view toggle
    function setupViewToggle() {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const viewType = btn.dataset.view;
                const bookmarksList = document.querySelector('.bookmarks-list');
                
                if (viewType === 'grid') {
                    bookmarksList.classList.add('grid-view');
                } else {
                    bookmarksList.classList.remove('grid-view');
                }
            });
        });
    }

    // Setup bookmark actions
    function setupBookmarkActions() {
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const bookmark = actionBtn.closest('.bookmark-item');
                const action = actionBtn.title.toLowerCase();

                switch (action) {
                    case 'edit':
                        editBookmark(bookmark);
                        break;
                    case 'delete':
                        deleteBookmark(bookmark);
                        break;
                }
            }
        });
    }

    // Add new bookmark
    function addNewBookmark() {
        const title = document.getElementById('bookmarkTitle').value;
        const url = document.getElementById('bookmarkUrl').value;
        const category = document.getElementById('bookmarkCategory').value;
        const icon = document.getElementById('bookmarkIcon').value;

        const bookmarkHTML = `
            <a href="${url}" class="bookmark-item">
                <div class="bookmark-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="bookmark-details">
                    <div class="bookmark-title">${title}</div>
                    <div class="bookmark-url">${url}</div>
                </div>
                <div class="bookmark-actions">
                    <button class="action-btn" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </a>
        `;

        // Find or create category section
        let section = findOrCreateSection(category);
        section.querySelector('.bookmarks-list').insertAdjacentHTML('afterbegin', bookmarkHTML);

        // Close modal and reset form
        bookmarkModal.style.display = 'none';
        addBookmarkForm.reset();
    }

    // Find or create category section
    function findOrCreateSection(category) {
        const existingSection = Array.from(document.querySelectorAll('.bookmarks-section'))
            .find(section => section.querySelector('h3').textContent.toLowerCase() === category.toLowerCase());

        if (existingSection) {
            return existingSection;
        }

        const newSection = document.createElement('div');
        newSection.className = 'bookmarks-section';
        newSection.innerHTML = `
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="bookmarks-list"></div>
        `;

        document.querySelector('.bookmarks-content').appendChild(newSection);
        return newSection;
    }

    // Edit bookmark
    function editBookmark(bookmark) {
        const title = bookmark.querySelector('.bookmark-title').textContent;
        const url = bookmark.querySelector('.bookmark-url').textContent;
        
        // Populate form
        document.getElementById('bookmarkTitle').value = title;
        document.getElementById('bookmarkUrl').value = url;
        
        // Show modal
        bookmarkModal.style.display = 'flex';
        
        // Update form submit handler
        const form = document.getElementById('addBookmarkForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            
            // Update bookmark
            bookmark.querySelector('.bookmark-title').textContent = document.getElementById('bookmarkTitle').value;
            bookmark.querySelector('.bookmark-url').textContent = document.getElementById('bookmarkUrl').value;
            bookmark.href = document.getElementById('bookmarkUrl').value;
            
            // Close modal
            bookmarkModal.style.display = 'none';
            form.reset();
            form.onsubmit = null; // Reset handler
        };
    }

    // Delete bookmark
    function deleteBookmark(bookmark) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            bookmark.remove();
            
            // Remove empty sections
            document.querySelectorAll('.bookmarks-section').forEach(section => {
                if (section.querySelector('.bookmarks-list').children.length === 0) {
                    section.remove();
                }
            });
        }
    }

    // Initialize
    initialize();
});
