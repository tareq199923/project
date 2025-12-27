// signup.js
document.getElementById('signupForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('sName').value;
  const username = document.getElementById('sUsername').value;
  const email = document.getElementById('sEmail').value;
  const gender = document.getElementById('sGender').value;
  const dob = document.getElementById('sDob').value;
  const password = document.getElementById('sPassword').value;
  const rePassword = document.getElementById('sRePassword').value;
  const userType = document.getElementById('sUserType').value;

  if (!name || !username || !email || !gender || !dob || !password || !userType) return alert('All fields required!');
  if (password !== rePassword) return alert('Passwords do not match!');
  if (password.length < 4) return alert('Password must be at least 4 characters!');

  const users = JSON.parse(localStorage.getItem('safenetsUsers')) || [];
  if (users.find(u => u.email === email)) return alert('Email already used!');
  if (users.find(u => u.username === username)) return alert('Username already exists!');

  const user = { name, username, email, gender, dob, password, type: userType, phone: '' }; // phone default empty
  users.push(user);
  localStorage.setItem('safenetsUsers', JSON.stringify(users));
  alert('Account created! Please login.');
  window.location.href = 'login.html';
};