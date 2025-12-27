// profile_edit.js - Updated to work with PHP backend
const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
if (!currentUser) {
  window.location.href = 'login.html';
}
document.getElementById('loggedUser').textContent = `Logged in as ${currentUser.name} (${currentUser.type.charAt(0).toUpperCase() + currentUser.type.slice(1)})`;

document.getElementById('editName').value = currentUser.name;
document.getElementById('editEmail').value = currentUser.email;
document.getElementById('editPhone').value = currentUser.phone || '';
document.getElementById('editDob').value = currentUser.dob;

document.getElementById('editForm').onsubmit = async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('editName').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const phone = document.getElementById('editPhone').value.trim();
  const dob = document.getElementById('editDob').value;

  if (!name || !email || !dob) {
    return alert('Required fields missing!');
  }
  
  if (phone && phone.length !== 11) {
    return alert('Phone must be 11 digits!');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return alert('Invalid email format!');
  }
  
  const dobDate = new Date(dob);
  const age = (new Date().getFullYear() - dobDate.getFullYear());
  if (age < 14) {
    return alert('Must be at least 14 years old!');
  }

  try {
    // Send update request to PHP backend
    const response = await fetch('php/update_profile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, dob })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Update currentUser in storage
      const storage = localStorage.getItem('currentUser') ? localStorage : sessionStorage;
      const updatedUser = {...currentUser, ...result.user};
      storage.setItem('currentUser', JSON.stringify(updatedUser));
      
      alert(result.message);
      window.location.href = 'profile_view.html';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Profile update error:', error);
    alert('An error occurred. Please try again.');
  }
};

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}
