// user_dashboard.js
const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (!currentUser || currentUser.type !== 'user') {
  window.location.href = 'login.html';
}
document.getElementById('loggedUser').textContent = `Logged in as ${currentUser.name} (User)`;

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}