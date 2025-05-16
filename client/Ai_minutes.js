document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const chatArea = document.querySelector('.ai-chat-area');
    const messageInput = document.getElementById('aiMessageInput');
    const sendButton = document.querySelector('.send-btn');
    const clearButton = document.querySelector('.clear-chat');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const contextMenu = document.querySelector('.context-menu');
    let currentMode = 'chat';

    // Mock AI responses
    const mockResponses = {
        chat: [
            "I understand. How can I help you with that?",
            "That's an interesting point. Let me analyze it further.",
            "Based on the available data, here's what I suggest...",
            "I've processed your request. Would you like more details?",
            "Let me help you with that. Here's what I found..."
        ],
        summarize: [
            "Here's a summary of the key points:\n• Point 1\n• Point 2\n• Point 3",
            "I've analyzed the content and here are the main takeaways...",
            "The main themes from this discussion are..."
        ],
        analyze: [
            "Based on my analysis:\n1. Trend A is increasing\n2. Pattern B shows correlation\n3. Recommendation: ...",
            "The data suggests the following insights...",
            "Here's my analytical breakdown of the situation..."
        ]
    };

    // Initialize functionality
    function initialize() {
        setupEventListeners();
        scrollToBottom();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Send message on button click
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }

        // Send message on Enter key
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Clear chat
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear the chat?')) {
                    chatArea.innerHTML = '';
                    addMessage('Hello! I\'m your AI assistant. How can I help you today?', 'ai');
                }
            });
        }

        // Mode switching
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMode = btn.dataset.mode;
                addMessage(`Switched to ${currentMode} mode. How can I assist you?`, 'ai');
            });
        });

        // Context menu for messages
        document.addEventListener('contextmenu', (e) => {
            const messageEl = e.target.closest('.message');
            if (messageEl) {
                e.preventDefault();
                showContextMenu(e.pageX, e.pageY);
            }
        });

        // Hide context menu on click outside
        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });

        // Handle context menu actions
        contextMenu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                handleContextMenuAction(action);
                contextMenu.style.display = 'none';
            });
        });
    }

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            messageInput.value = '';
            
            // Simulate AI thinking
            setTimeout(() => {
                const responses = mockResponses[currentMode];
                const response = responses[Math.floor(Math.random() * responses.length)];
                addMessage(response, 'ai');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, type) {
        const time = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const messageHTML = `
            <div class="message ${type}-message">
                ${type === 'ai' ? `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                ` : ''}
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${time}</div>
                </div>
                ${type === 'user' ? `
                    <div class="message-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                ` : ''}
            </div>
        `;

        chatArea.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Scroll chat to bottom
    function scrollToBottom() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Show context menu
    function showContextMenu(x, y) {
        contextMenu.style.display = 'block';
        
        // Adjust position to keep menu within window bounds
        const menuRect = contextMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (x + menuRect.width > windowWidth) {
            x = windowWidth - menuRect.width;
        }
        if (y + menuRect.height > windowHeight) {
            y = windowHeight - menuRect.height;
        }

        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
    }

    // Handle context menu actions
    function handleContextMenuAction(action) {
        switch(action) {
            case 'Copy':
                // Implementation for copy
                break;
            case 'Share':
                // Implementation for share
                break;
            case 'Save':
                // Implementation for save
                break;
        }
    }

    // Initialize
    initialize();
});
