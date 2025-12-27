// change_password.js
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

document.getElementById('changePassForm').onsubmit = function(e) {
  e.preventDefault();
  const currentPass = document.getElementById('currentPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;

  if (currentPass !== currentUser.password) return alert('Current password incorrect!');
  if (newPass !== confirmPass) return alert('New passwords do not match!');
  if (newPass.length < 8) return alert('New password must be at least 8 characters!');

  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  const userIndex = users.findIndex(u => u.username === currentUser.username);
  if (userIndex === -1) return;

  users[userIndex].password = newPass;
  localStorage.setItem('safenetsUsers', JSON.stringify(users));

  const updatedUser = {...currentUser, password: newPass};
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

  alert('Password changed successfully!');
  if (currentUser.type === 'admin' || currentUser.type === 'consultant') {
    window.location.href = 'admin_dashboard.html';
  } else {
    window.location.href = 'user_dashboard.html';
  }
};