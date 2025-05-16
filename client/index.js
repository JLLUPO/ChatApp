
// Modal handling code
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const meetingModal = document.getElementById('meetingModal');
    const groupModal = document.getElementById('groupModal');
    const bookmarksModal = document.getElementById('bookmarksModal');
    const aiModal = document.getElementById('aiModal');
    const calendarModal = document.getElementById('calendarModal');
    const filesModal = document.getElementById('filesModal');
    const tasksModal = document.getElementById('tasksModal');
    const feedbackModal = document.getElementById('feedbackModal');
    const notificationsModal = document.getElementById('notificationsModal');
    
    // Load content for modals
    Promise.all([
        fetch('Meeting.html').then(response => response.text()),
        fetch('Group.html').then(response => response.text()),
        fetch('Bookmark.html').then(response => response.text()),
        fetch('Ai_minutes.html').then(response => response.text()),
        fetch('Calendar.html').then(response => response.text()),
        fetch('Files.html').then(response => response.text()),
        fetch('Tasks.html').then(response => response.text()),
        fetch('Feedback.html').then(response => response.text())
    ]).then(([meetingHtml, groupHtml, bookmarksHtml, aiHtml, calendarHtml, filesHtml, tasksHtml, feedbackHtml]) => {
        meetingModal.innerHTML = meetingHtml;
        groupModal.innerHTML = groupHtml;
        bookmarksModal.innerHTML = bookmarksHtml;
        aiModal.innerHTML = aiHtml;
        calendarModal.innerHTML = calendarHtml;
        filesModal.innerHTML = filesHtml;
        tasksModal.innerHTML = tasksHtml;
        feedbackModal.innerHTML = feedbackHtml;
    });

    // Handle modal triggers
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const modalType = button.getAttribute('data-modal');
            modalOverlay.style.display = 'flex';
            
            if (modalType === 'meeting') {
                meetingModal.style.display = 'block';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'group') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'block';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'bookmarks') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'block';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'ai') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'block';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'calendar') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'block';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'files') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'block';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'tasks') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'block';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'feedback') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'block';
                notificationsModal.style.display = 'none';
            } else if (modalType === 'notifications') {
                meetingModal.style.display = 'none';
                groupModal.style.display = 'none';
                bookmarksModal.style.display = 'none';
                aiModal.style.display = 'none';
                calendarModal.style.display = 'none';
                filesModal.style.display = 'none';
                tasksModal.style.display = 'none';
                feedbackModal.style.display = 'none';
                notificationsModal.style.display = 'block';
            } else if (modalType === 'chat') {
                modalOverlay.style.display = 'none';
                document.querySelector('.chat-container').classList.toggle('show');
            }
        });
    });

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            meetingModal.style.display = 'none';
            groupModal.style.display = 'none';
            bookmarksModal.style.display = 'none';
            aiModal.style.display = 'none';
            calendarModal.style.display = 'none';
            filesModal.style.display = 'none';
            tasksModal.style.display = 'none';
            feedbackModal.style.display = 'none';
            notificationsModal.style.display = 'none';
        }
    });

    // Close modal on X button click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-meeting') ||
            e.target.classList.contains('close-group') ||
            e.target.classList.contains('close-bookmarks') ||
            e.target.classList.contains('close-ai') ||
            e.target.classList.contains('close-calendar') || 
            e.target.classList.contains('close-files') || 
            e.target.classList.contains('close-tasks') || 
            e.target.classList.contains('close-feedback') || 
            e.target.classList.contains('close-notifications')) {
            modalOverlay.style.display = 'none';
            meetingModal.style.display = 'none';
            groupModal.style.display = 'none';
            bookmarksModal.style.display = 'none';
            aiModal.style.display = 'none';
            calendarModal.style.display = 'none';
            filesModal.style.display = 'none';
            tasksModal.style.display = 'none';
            feedbackModal.style.display = 'none';
            notificationsModal.style.display = 'none';
        }
    });
});

// =============== NON-AESTHETICS CODE STARTS HERE =================

const API_BASE = location.hostname === 'localhost'
? 'http://localhost:5000'
: 'https://chat-backend-0qmm.onrender.com';


(async () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Verify token with backend
  try {
    const response = await fetch(API_BASE + '/api/chat/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Token invalid');
    }

    // Token is valid 
    initializeChat(username);
  } catch (err) {
    console.error('Authentication failed:', err);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
  }
})();

// Chat setup separated from auth
function initializeChat(username) {
  const socket = io(API_BASE);
  socket.emit('init', username);

  const messages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.querySelector('.chat-input button');
  const recipientSelect = document.getElementById('recipient-select')

  let selectedRecipient = ''

 // Fetch all users for the dropdown
  fetch('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      if (user.username !== username) {
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        recipientSelect.appendChild(option);
      }
    }); 
  });

  // Handle recipient change
  recipientSelect.addEventListener('change', async (e) => {
    selectedRecipient = e.target.value;
    messages.innerHTML = ''; // Clear messages
    
    if (selectedRecipient) {
      const res = await fetch(`/api/messages/${selectedRecipient}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const history = await res.json();
      console.log('History:', history);

      history.forEach(msg => {
        msg.text = decryptMessage(msg.text);
        displayMessage(msg)
      });
    }
  });

  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
      const msg = {
        sender: username,
        recipient: selectedRecipient,
        text: encryptMessage(text)
      };
      socket.emit('direct message', msg);
      chatInput.value = '';
    }
  }

  // Receiving a message
  socket.on('direct message', (msg) => {
  if (
    (msg.sender === selectedRecipient && msg.recipient === username) ||
    (msg.sender === username && msg.recipient === selectedRecipient)
  ) {
    msg.text = decryptMessage(msg.text);
    displayMessage(msg);
  }
});

  // Display message to chat
  function displayMessage(msg) {
    const li = document.createElement('li');
    li.classList.add('message-container');
    

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    
    bubbleDiv.textContent = msg.text;

    if (msg.sender === username) {
      li.classList.add('message-right');
      bubbleDiv.classList.add('bubble-right');
    } else {
      li.classList.add('message-left');
      bubbleDiv.classList.add('bubble-left');
    }
    
    li.appendChild(bubbleDiv);
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  sessionStorage.removeItem('encryptionKey');
  window.location.href = 'login.html';
});

function getKey() {
  const key = sessionStorage.getItem('encryptionKey');
  if (!key) {
    alert("Missing encryption key. Please log in again.");
    window.location.href = "login.html";
  }
  return key;
}

function encryptMessage(text) {
  const key = getKey();
  return CryptoJS.AES.encrypt(text, key).toString();
}

function decryptMessage(ciphertext) {
  const key = getKey();
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}