document.addEventListener("DOMContentLoaded", function () {
    // Function to control slideshow
    function showSlides(slideIndex, slideshowId, captionId, dotsId) {
        let i;
        const slides = document.querySelectorAll("#" + slideshowId + " .mySlides");
        const dots = document.querySelectorAll("#" + dotsId + " .dot");
        const captionText = document.getElementById(captionId);

        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Deactivate all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
        captionText.innerHTML = slides[slideIndex - 1].querySelector("img").alt;

        // Change slide every 2 seconds
        setTimeout(function () {
            showSlides(slideIndex, slideshowId, captionId, dotsId);
        }, 5000);
    }

    // Start both slideshows
    showSlides(0, "slideshow1", "caption1", "dots1");
    showSlides(0, "slideshow2", "caption2", "dots2");
});