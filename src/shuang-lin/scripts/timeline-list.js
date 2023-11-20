document.addEventListener("DOMContentLoaded", function () {
    // Get all timeline items
    const timelineItems = document.querySelectorAll(".timeline ul li");

    // Add click event listener to each timeline item
    timelineItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            console.log(event.target.nodeName);

            // Check if the element that was clicked is a paragraph or anchor
            if(event.target.nodeName == "P" || event.target.nodeName == "A"){
                return;
            }
            else{
                // Otherwise, toggle the "active" class to expand/collapse the item
                this.classList.toggle("active");
                event.stopPropagation(); // Prevent the click event from bubbling up
            }
        });
    });
});
