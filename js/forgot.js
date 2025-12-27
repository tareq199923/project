// forgot.js
function sendResetCode() {
  const email = document.getElementById('forgotEmail').value;
  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  const user = users.find(u => u.email === email);
  if (!user) return alert('No account with this email!');
  // Simulate code: 123456
  alert('Code sent to your email! For demo, use: 123456');
  document.getElementById('forgotStep1').style.display = 'none';
  document.getElementById('forgotStep2').style.display = 'block';
}

function resetPassword() {
  const code = document.getElementById('resetCode').value;
  const newPass = document.getElementById('newPass').value;
  const confirm = document.getElementById('newPassConfirm').value;
  if (code !== '123456') return alert('Invalid code!');
  if (newPass !== confirm) return alert('Passwords do not match!');
  if (newPass.length < 8) return alert('Password must be at least 8 characters!');

  const email = document.getElementById('forgotEmail').value;
  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  const userIndex = users.findIndex(u => u.email === email);
  if (userIndex === -1) return;
  users[userIndex].password = newPass;
  localStorage.setItem('safenetsUsers', JSON.stringify(users));
  alert('Password changed successfully!');
  window.location.href = 'login.html';
}