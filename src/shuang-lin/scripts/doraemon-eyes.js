var eyeLeft = document.getElementById("eye-left");
var eyeRight = document.getElementById("eye-right");

document.addEventListener("mousemove", (e) => {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var angleLeft = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    var angleRight = Math.atan2(e.clientY - centerY, e.clientX - centerX);

    const radius = 10; // Adjust the radius as needed

    var eyeXLeft = centerX + Math.cos(angleLeft) * radius;
    var eyeYLeft = centerY + Math.sin(angleLeft) * radius;

    var eyeXRight = centerX + Math.cos(angleRight) * radius;
    var eyeYRight = centerY + Math.sin(angleRight) * radius;

    eyeLeft.style.left = eyeXLeft + "px";
    eyeLeft.style.top = eyeYLeft + "px";

    eyeRight.style.left = eyeXRight + "px";
    eyeRight.style.top = eyeYRight + "px";
});
