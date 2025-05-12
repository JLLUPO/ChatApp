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

    // Token is valid — let user use the chat
    initializeChat(username)
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

  const messages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.querySelector('.chat-input button');

  sendButton.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (text) {
      const msg = {
        user: username,
        text,
      };
      socket.emit('chat message', msg);
      chatInput.value = '';
    }
  }

  // Receive chat history
  socket.on('chat history', (messagesArray) => {
    messagesArray.forEach(msg => {
      displayMessage(msg);
    });
  });

  // Receive new messages
  socket.on('chat message', msg => {
    displayMessage(msg);
  });

  // Display message to chat
  function displayMessage(msg) {
    const li = document.createElement('li');
    li.classList.add('message-container');
    

    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    
    bubbleDiv.textContent = msg.text;

    if (msg.user === username) {
      li.classList.add('message-right');
      bubbleDiv.classList.add('bubble-right');
    } else {
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('username');
      nameDiv.textContent = msg.user;
      li.classList.add('message-left');
      bubbleDiv.classList.add('bubble-left');

      li.appendChild(nameDiv);
    }
    
    li.appendChild(bubbleDiv);
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
  }
}

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});