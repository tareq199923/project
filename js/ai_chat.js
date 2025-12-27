// ai_chat.js
const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'login.html';
}
document.getElementById('loggedUser').textContent = `Logged in as ${currentUser.name} (${currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)})`;

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  appendMessage(msg, 'user-msg');
  input.value = '';
  setTimeout(() => {
    const replies = [
      "I'm here to help. How are you feeling today?",
      "You're not alone. Let's talk about it.",
      "Take a deep breath. What's on your mind?",
      "Your safety is important. Would you like resources?"
    ];
    appendMessage(replies[Math.floor(Math.random() * replies.length)], 'bot-msg');
  }, 800);
}

function appendMessage(text, className) {
  const chatBox = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = `message ${className}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}