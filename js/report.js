// report.js
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

document.getElementById('reportForm').onsubmit = function(e) {
  e.preventDefault();
  const desc = document.getElementById('incidentDesc').value;
  const rel = document.getElementById('relationship').value;
  const type = document.getElementById('bullyingType').value;
  if (!desc || !rel || !type) return alert('All fields required!');
  // Simulate submission
  alert('Report submitted successfully! Our team will review it.');
  if (currentUser.type === 'admin' || currentUser.type === 'consultant') {
    window.location.href = 'admin_dashboard.html';
  } else {
    window.location.href = 'user_dashboard.html';
  }
};