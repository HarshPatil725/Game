// DOM elements  
const btnSignIn = document.getElementById('btnSignIn');
const btnSignUp = document.getElementById('btnSignUp');
const formSignIn = document.getElementById('formSignIn');
const formSignUp = document.getElementById('formSignUp');
const title = document.getElementById('form-title');

// Load existing users or initialize empty  
let users = JSON.parse(localStorage.getItem('users')) || [];  // :contentReference[oaicite:2]{index=2}

// Helper: save users back to localStorage  
function saveUsers() {  
  localStorage.setItem('users', JSON.stringify(users));       // :contentReference[oaicite:3]{index=3}  
}

// Helper: set current user  
function setCurrentUser(username) {  
  localStorage.setItem('currentUser', username);             // :contentReference[oaicite:4]{index=4}  
}

// SIGN UP handler  
formSignUp.addEventListener('submit', e => {  
  e.preventDefault();  

  const username = document.getElementById('signUpUser').value.trim();  
  const email    = document.getElementById('signUpEmail').value.trim();  
  const password = document.getElementById('signUppass').value;  

  // Basic uniqueness check  
  if (users.find(u => u.username === username)) {  
    alert('Username already taken');  
    return;  
  }  

  // Add new user  
  users.push({ username, email, password });  
  saveUsers();  
  window.location.reload();  // reload so profile button appears  
});  

// SIGN IN handler  
formSignIn.addEventListener('submit', e => {  
  e.preventDefault();  

  const email    = document.getElementById('signInEmail').value.trim();  
  const password = document.getElementById('signInpass').value;  

  const user = users.find(u => u.email === email && u.password === password);  
  if (!user) {  
    alert('Invalid credentials');  
    return;  
  }  
  alert("Harsh logged in") ;
  setCurrentUser(user.username);
  window.location.href = "../index.html";    
});  

// Toggle forms  
btnSignIn.addEventListener('click', () => {  
  formSignIn.classList.add('activeForm');  
  formSignUp.classList.remove('activeForm');  
  btnSignIn.classList.add('active');  
  btnSignUp.classList.remove('active');  
  title.textContent = 'Sign In';  
});  

btnSignUp.addEventListener('click', () => {  
  formSignUp.classList.add('activeForm');  
  formSignIn.classList.remove('activeForm');  
  btnSignUp.classList.add('active');  
  btnSignIn.classList.remove('active');  
  title.textContent = 'Sign Up';  
});  
