document.addEventListener('DOMContentLoaded', () => {
    // Load Editor.html content into main-content
    fetch('Editor.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('.main-content').innerHTML = html;
        })
        .catch(error => console.error('Error loading editor:', error));

    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    
    // Initialize chat functionality
    function initializeChat() {
        const messageList = document.getElementById('messageList');
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendMessage');
        const voiceCallBtn = document.getElementById('voiceCallBtn');
        const videoCallBtn = document.getElementById('videoCallBtn');
        const closeChat = document.querySelector('.close-chat');

        if (!messageInput || !sendButton) return; // Exit if elements aren't loaded

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message) {
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.innerHTML = `
                    <div class="message-content">${message}</div>
                    <div class="message-time">${time}</div>
                `;
                messageList.appendChild(messageElement);
                messageInput.value = '';
                messageList.scrollTop = messageList.scrollHeight;

                // Mock response after 1 second
                setTimeout(() => {
                    const responses = ['Interesting!', 'Tell me more...', 'Got it!', 'Thanks!'];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    const responseElement = document.createElement('div');
                    responseElement.className = 'message received';
                    responseElement.innerHTML = `
                        <div class="message-content">${randomResponse}</div>
                        <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    `;
                    messageList.appendChild(responseElement);
                    messageList.scrollTop = messageList.scrollHeight;
                }, 1000);
            }
        }

        // Event listeners
        sendButton.addEventListener('click', sendMessage);

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        if (voiceCallBtn) {
            voiceCallBtn.addEventListener('click', () => {
                console.log('Voice call initiated');
            });
        }

        if (videoCallBtn) {
            videoCallBtn.addEventListener('click', () => {
                console.log('Video call initiated');
            });
        }

        if (closeChat) {
            closeChat.addEventListener('click', () => {
                modalOverlay.classList.remove('show');
            });
        }
    }

    // Modal content templates
    const modalContents = {
        files: {
            title: 'Files',
            content: 'File management system content goes here'
        },
        tasks: {
            title: 'Tasks',
            content: 'Task management system content goes here'
        },
        chat: {
            title: 'Chat',
            template: 'Chat.html'
        },
        calendar: {
            title: 'Calendar',
            content: 'Calendar system content goes here'
        },
        feedback: {
            title: 'Feedback',
            content: 'Feedback system content goes here'
        },
        ai: {
            title: 'AI Assistant',
            content: 'AI Assistant interface content goes here'
        },
        bookmarks: {
            title: 'Bookmarks',
            content: 'Bookmarks management content goes here'
        },
        members: {
            title: 'Group Members',
            content: 'Group members management content goes here'
        },
        notifications: {
            title: 'Notifications',
            content: 'Notifications center content goes here'
        },
        record: {
            title: 'Record Meetings',
            content: 'Meeting recording interface content goes here'
        }
    };

    function showModal(modalType) {
        const content = modalContents[modalType];
        
        if (content) {
            if (content.template) {
                // Load template content
                fetch(content.template)
                    .then(response => response.text())
                    .then(html => {
                        modalBody.innerHTML = html;
                        modalOverlay.classList.add('show');
                        // Initialize chat if this is the chat template
                        if (content.template === 'Chat.html') {
                            initializeChat();
                        }
                    })
                    .catch(error => console.error('Error loading template:', error));
            } else {
                // Use static content
                modalBody.innerHTML = `<h2>${content.title}</h2><div>${content.content}</div>`;
                modalOverlay.classList.add('show');
            }
        }
    }

    // Add click handlers to all nav buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modalType = button.dataset.modal;
            showModal(modalType);
        });
    });

    // Add event listener to feedback button
    document.querySelector('[title="Peer Feedback"]').addEventListener('click', () => {
        showModal('feedback');
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            modalOverlay.classList.remove('show');
        }
    });
});
