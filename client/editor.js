document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    let canvas, ctx;
    
    // Store comments for each tab
    const tabComments = {
        'document-editor': [
            { author: 'John Doe', time: '2 min ago', content: 'Nice work on the introduction!' }
        ],
        'code-editor': [
            { author: 'Jane Smith', time: '5 min ago', content: 'The code looks clean and efficient.' }
        ],
        'pdf-annotator': [],
        'drawing-canvas': []
    };
    
    // Current active tab
    let currentTab = 'document-editor';

    function initializeCanvas() {
        canvas = document.getElementById('drawingBoard');
        if (canvas) {
            ctx = canvas.getContext('2d');
            setupCanvasListeners();
            resizeCanvas();
        }
    }

    // Set canvas size
    function resizeCanvas() {
        if (!canvas) return;
        const container = canvas.parentElement;
        canvas.width = container.clientWidth - 40;
        canvas.height = container.clientHeight - 60;
    }

    // Drawing functions and event listeners setup
    function setupCanvasListeners() {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function startDrawing(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function draw(e) {
            if (!isDrawing) return;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        function stopDrawing() {
            isDrawing = false;
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        // Drawing tools
        const clearCanvas = document.getElementById('clearCanvas');
        const colorPicker = document.getElementById('colorPicker');
        const brushSize = document.getElementById('brushSize');

        if (clearCanvas) {
            clearCanvas.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            });
        }

        if (colorPicker) {
            colorPicker.addEventListener('change', (e) => {
                ctx.strokeStyle = e.target.value;
            });
        }

        if (brushSize) {
            brushSize.addEventListener('input', (e) => {
                ctx.lineWidth = e.target.value;
            });
        }
    }

    function switchTab(tabId) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const editorContents = document.querySelectorAll('.editor-content');
        
        // Update active tab button
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Show selected content
        editorContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
                content.style.display = 'block';
                if (tabId === 'drawing-canvas') {
                    initializeCanvas();
                }
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });

        // Update comments for this tab
        currentTab = tabId;
        updateComments(tabId);
    }

    // Initialize all functionality
    function initialize() {
        // Add click handlers to tabs
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // Initialize other features
        initializeVersionHistory();
        initializePdfHighlighting();
        initializeComments();

        // Show default tab
        const defaultTab = document.querySelector('.editor-content.active');
        if (defaultTab) {
            currentTab = defaultTab.id;
            switchTab(currentTab);
        }
    }

    function initializeVersionHistory() {
        const versionBtn = document.getElementById('versionBtn');
        const versionDropdown = document.querySelector('.version-dropdown');

        if (versionBtn && versionDropdown) {
            versionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                versionDropdown.style.display = 
                    versionDropdown.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', () => {
                versionDropdown.style.display = 'none';
            });
        }
    }

    function initializePdfHighlighting() {
        const pdfTexts = document.querySelectorAll('.pdf-text');
        pdfTexts.forEach(text => {
            text.addEventListener('click', () => {
                text.classList.toggle('highlighted');
            });
        });
    }

    function updateComments(tabId) {
        const commentsList = document.querySelector('.comments-list');
        if (!commentsList) return;

        // Clear existing comments
        commentsList.innerHTML = '';

        // Add comments for current tab
        tabComments[tabId].forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${comment.time}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
            `;
            commentsList.appendChild(commentElement);
        });
    }

    function initializeComments() {
        const commentInput = document.querySelector('.comment-input textarea');
        const sendCommentBtn = document.querySelector('.comment-input button');

        if (sendCommentBtn && commentInput) {
            sendCommentBtn.addEventListener('click', () => {
                if (commentInput.value.trim()) {
                    // Create new comment
                    const newComment = {
                        author: 'You',
                        time: 'Just now',
                        content: commentInput.value.trim()
                    };

                    // Add to current tab's comments
                    tabComments[currentTab].unshift(newComment);

                    // Update the display
                    updateComments(currentTab);

                    // Clear input
                    commentInput.value = '';
                }
            });
        }
    }

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Initialize everything
    initialize();
});
