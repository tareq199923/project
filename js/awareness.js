// awareness.js
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