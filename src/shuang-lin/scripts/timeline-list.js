document.addEventListener("DOMContentLoaded", function () {
    // Get all timeline items
    const timelineItems = document.querySelectorAll(".timeline ul li");

    // Add click event listener to each timeline item
    timelineItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            // Toggle the "active" class to expand/collapse the item
            this.classList.toggle("active");
            event.stopPropagation(); // Prevent the click event from bubbling up
        });
    });

    // Add a click event listener to the document to collapse items when clicking outside
    document.addEventListener("click", function (event) {
        timelineItems.forEach((item) => {
            if (!item.contains(event.target)) {
                item.classList.remove("active");
            }
        });
    });
});
