'use strict';
// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// admin login
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
    const nameValue = document.getElementById("name").value;
  const emailvalue = document.getElementById("email").value;
  const messageValue = document.getElementById("message").value;
  const response = { nameValue, emailvalue, messageValue, date: new Date().toISOString() };
    const responses = JSON.parse(localStorage.getItem('responses')) || [ ] ; 
  responses.push(response);
  localStorage.setItem("responses", JSON.stringify(responses));
  console.log(responses);
  alert("Thankyou for your message, I will get in touch with you ASAP!");
  this.reset();                   
});


function showAdminLogin(){
  document.getElementById('admin-login').style.display = 'block';
}
document.getElementById('login-form').addEventListener('submit', function(e){
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const storedUsername = 'admin';
  const storedPassword = '12345';
  if (username === storedUsername && password === storedPassword) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block'; 
    alert("Welcome Admin!");
    displayStoredUserResponses();
  }
  else{
    alert("Invalid Credentials, please try again.")
  }
});
function displayStoredUserResponses(){  
  const responseContainer = document.getElementById('user-responses');
  const responses = JSON.parse(localStorage.getItem('responses')) || [ ];
  responseContainer.innerHTML = '';
    responses.forEach(response =>{
    const responseElement = document.createElement('div');
    responseElement.innerHTML = `
    <p> Name: ${response.nameValue}</p>
    <p> Email: ${response.emailvalue}</p>
    <p> Message: ${response.messageValue}</p>
    <p> Date: ${response.date}</p>
    <hr>
    `;
    responseContainer.appendChild(responseElement); 
  });
}