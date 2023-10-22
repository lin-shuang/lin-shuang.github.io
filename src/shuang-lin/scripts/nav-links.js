// JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get the menu icon and nav-links elements
  const menuIcon = document.querySelector(".menu-overlay");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("overlay");
  let navOpen = false;

  // Add a click event listener to the document
  document.addEventListener("click", function (e) {
    // Check if menu icon is clicked
    if (e.target == menuIcon){
      toggleNav();
    } 

    // Check if outside is clicked
    else if(e.target != menuIcon && e.target != navLinks && navOpen == true){
      toggleNav();
    }
  });

  // Function to toggle the nav-links menu
  function toggleNav() {
    if(navOpen == false){
      navLinks.classList.toggle("active");
      overlay.classList.toggle("active");
      navOpen = true;
    }
    else{
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
      navOpen = false;
    }
  }
});
