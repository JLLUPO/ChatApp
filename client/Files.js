document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let isDragging = false;
    const filesList = document.querySelector('.files-list');
    const uploadBtn = document.querySelector('.upload-btn');
    const fileInput = document.getElementById('fileInput');
    const searchInput = document.querySelector('.search-bar input');
    const viewButtons = document.querySelectorAll('.view-btn');

    // File type icons mapping
    const fileIcons = {
        'pdf': 'fa-file-pdf',
        'doc': 'fa-file-word',
        'docx': 'fa-file-word',
        'xls': 'fa-file-excel',
        'xlsx': 'fa-file-excel',
        'txt': 'fa-file-alt',
        'jpg': 'fa-file-image',
        'png': 'fa-file-image',
        'py': 'fa-file-code',
        'js': 'fa-file-code',
        'html': 'fa-file-code',
        'css': 'fa-file-code'
    };

    // Initialize functionality
    function initialize() {
        setupDragAndDrop();
        setupFileUpload();
        setupSearch();
        setupViewToggle();
        setupFileActions();
    }

    // Setup drag and drop
    function setupDragAndDrop() {
        const dropZone = document.querySelector('.files-container');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropZone.classList.add('drag-highlight');
        }

        function unhighlight(e) {
            dropZone.classList.remove('drag-highlight');
        }

        dropZone.addEventListener('drop', handleDrop, false);
    }

    // Handle file drop
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Setup file upload
    function setupFileUpload() {
        uploadBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }

    // Handle files
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            uploadFile(file);
        });
    }

    // Upload file
    function uploadFile(file) {
        // Show progress bar
        const progressBar = document.querySelector('.upload-progress');
        const progress = progressBar.querySelector('.progress');
        const progressText = progressBar.querySelector('.progress-text');
        progressBar.style.display = 'block';

        // Simulate upload progress
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    progressBar.style.display = 'none';
                    addFileToList(file);
                }, 500);
            } else {
                width += Math.random() * 30;
                if (width > 100) width = 100;
                progress.style.width = width + '%';
                progressText.textContent = Math.round(width) + '%';
            }
        }, 500);
    }

    // Add file to list
    function addFileToList(file) {
        const extension = file.name.split('.').pop().toLowerCase();
        const iconClass = fileIcons[extension] || 'fa-file';
        const date = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.type = extension;
        fileItem.innerHTML = `
            <div class="file-icon">
                <i class="fas ${iconClass}"></i>
            </div>
            <div class="file-details">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">
                    <span class="file-date">Modified: ${date}</span>
                    <select class="version-select">
                        <option>v1 (Current)</option>
                    </select>
                </div>
            </div>
            <div class="file-actions">
                <button class="action-btn" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="action-btn" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
                <button class="action-btn" title="Delete">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        filesList.insertBefore(fileItem, filesList.firstChild);
        setupFileActions(fileItem);
    }

    // Setup search functionality
    function setupSearch() {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const files = document.querySelectorAll('.file-item');

            files.forEach(file => {
                const fileName = file.querySelector('.file-name').textContent.toLowerCase();
                if (fileName.includes(searchTerm)) {
                    file.style.display = 'flex';
                } else {
                    file.style.display = 'none';
                }
            });
        });
    }

    // Setup view toggle
    function setupViewToggle() {
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const viewType = btn.dataset.view;
                if (viewType === 'grid') {
                    filesList.classList.add('grid-view');
                } else {
                    filesList.classList.remove('grid-view');
                }
            });
        });
    }

    // Setup file actions
    function setupFileActions(container = document) {
        container.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.title.toLowerCase();
                const fileItem = e.currentTarget.closest('.file-item');
                const fileName = fileItem.querySelector('.file-name').textContent;

                switch (action) {
                    case 'download':
                        alert(`Downloading ${fileName}`);
                        break;
                    case 'share':
                        alert(`Sharing ${fileName}`);
                        break;
                    case 'delete':
                        if (confirm(`Are you sure you want to delete ${fileName}?`)) {
                            fileItem.remove();
                        }
                        break;
                }
            });
        });
    }

    // Initialize all functionality
    initialize();
});
