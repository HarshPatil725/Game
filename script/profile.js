
// profileButton.js
function updateNavButton() {
  const user = localStorage.getItem('currentUser');
  const navBtn = document.getElementById('signInBtn');
  if (!navBtn) return;

  if (user) {
    navBtn.textContent = user;
    navBtn.id = 'profileBtn';
    navBtn.classList.add('btn-profile');
    navBtn.onclick = () => window.location.href = 'profile.html';
  } else {
    navBtn.textContent = 'Sign In';
    navBtn.id = 'signInBtn';
    navBtn.classList.remove('btn-profile');
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
      navBtn.onclick = () => window.location.href = 'pages/signIn.html';
    }
    else {
      navBtn.onclick = null;
    }
  }
}

// Run once on load  
document.addEventListener('DOMContentLoaded', updateNavButton);

// Also run whenever auth state changes  
window.addEventListener('authChanged', updateNavButton);

