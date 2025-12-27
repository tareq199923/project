// login.js - Updated to work with PHP backend
document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember')?.checked || false;
  
  if (!username || !password) {
    return alert('All fields are required!');
  }
  
  try {
    // Send login request to PHP backend
    const response = await fetch('php/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, remember })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Store user data in localStorage or sessionStorage
      const storage = result.remember ? localStorage : sessionStorage;
      storage.setItem('currentUser', JSON.stringify(result.user));
      
      alert(result.message);
      
      // Redirect based on user type
      if (result.user.type === 'admin' || result.user.type === 'consultant') {
        window.location.href = 'admin_dashboard.html';
      } else {
        window.location.href = 'user_dashboard.html';
      }
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred. Please try again.');
  }
};