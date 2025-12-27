// profile_view.js
const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'login.html';
}
document.getElementById('loggedUser').textContent = `Logged in as ${currentUser.name} (${currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)})`;

document.getElementById('pName').textContent = currentUser.name;
document.getElementById('pUsername').textContent = currentUser.username;
document.getElementById('pEmail').textContent = currentUser.email;
document.getElementById('pGender').textContent = currentUser.gender;
document.getElementById('pDob').textContent = currentUser.dob;
document.getElementById('pPhone').textContent = currentUser.phone || 'Not set';
document.getElementById('pType').textContent = currentUser.type.toUpperCase();

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}