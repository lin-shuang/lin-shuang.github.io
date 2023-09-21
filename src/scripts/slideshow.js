let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
    let i;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");
    const captionText = document.getElementById("caption");
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Deactivate all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = "dot";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className = "dot active";
    captionText.innerHTML = slides[slideIndex - 1].querySelector("img").alt;
    
    // Change slide every 5 seconds
    setTimeout(function() {
        showSlides(slideIndex);
    }, 5000);
}