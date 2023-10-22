let doraemonElement = document.querySelector('.doraemon');
let isAwake = false;
let isIdle = false;
let isWalking = false;

function wakeUpDoraemon() {
    isAwake = true;
    doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/sleep/doraemon-wake.gif')"; // Doraemon wakes up
    
    // Wake up for 2.75s
    setTimeout(function () {
        setIdleState();
    }, 2750);
}

function setIdleState() {
    if (isAwake) {
        isIdle = true;
        doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/idle/doraemon-idle.gif')"; // Doraemon goes idle
    }
    else{
        //debug
        console.log("ERROR, not awake");
    }   
}

function performRandomAction() {
    if (isIdle) {
        isIdle = false;
        let randomGifNumber = Math.floor(Math.random() * 8) + 1;
        doraemonElement.style.backgroundImage = `url('./src/shuang-lin/images/doraemon/random/doraemon-random-${randomGifNumber}.gif')`; // Perform a random action
        
        // Random action play for 3s
        setTimeout(function () {
            setIdleState();
        }, 5000);
    }
    else{
        //debug
        console.log("ERROR, not idle");
    }
}

function checkStatesPeriodically() {

    //debug
    console.log("Checking...");

    // Every 5s, 2/3 to walk, 1/3 to act
    setInterval(function () {
        if (isAwake && isIdle) {
            let walkOrAct = Math.floor(Math.random() * 3);

            if(walkOrAct == 0){
                performRandomAction();
            }
            else{
                startWalking();
            }
        }
    }, 5000);
}

function startWalking() {
    if (!isWalking && isIdle) {

        //debug
        console.log("Walking...");

        isWalking = true;
        isIdle = false;
        doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/moving/doraemon-hop.gif')";

        // Range
        const pageWidth = document.body.clientWidth;
        const range1 = [-pageWidth/3, -20];
        const range2 = [20, pageWidth/3];
        const randomRange = Math.random() < 0.5 ? range1 : range2;
        const randomX = Math.random() * (randomRange[1] - randomRange[0]) + randomRange[0];
        
        // Speed, distance, duration
        let walkSpeed = 50; // Default speed
        const initialX = parseFloat(getComputedStyle(doraemonElement).left || 0);
        const deltaX = randomX - initialX;

        // Check direction
        if(deltaX > 0){
            doraemonElement.style.transform = "scaleX(1)"; // No flip, default
        }
        else if(deltaX < 0){
            doraemonElement.style.transform = "scaleX(-1)"; // Flip horizontally
        }

        // Check if should run
        if(deltaX > 125){
            walkSpeed = 150;
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/moving/doraemon-run.gif')";
        }
        else if(deltaX < -125){
            walkSpeed = 150;
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/moving/doraemon-run.gif')";
        }

        // Calculate duration
        const animationDuration = Math.max(500, (Math.abs(deltaX) / walkSpeed) * 1000);

        //debug        
        console.log("pageWidth: ", pageWidth);
        console.log("animationDuration: ", animationDuration);
        console.log("deltaX: ", deltaX);

        // Calculate the animation start time
        const startTime = performance.now();

        // Define an animation function
        function animate(currentTime) {
            // Calculate the progress of the animation
            const progress = (currentTime - startTime) / animationDuration;

            // If the animation is complete, stop walking
            if (progress >= 1) {
                isWalking = false;
                setIdleState();
                return;
            }

            // Calculate the new position using linear interpolation
            const currentPosition = parseFloat(getComputedStyle(doraemonElement).left || 0);
            const targetPosition = initialX + (deltaX * progress);
            doraemonElement.style.left = targetPosition + 'px';

            // Continue the animation
            requestAnimationFrame(animate);
        }

        // Start the animation
        requestAnimationFrame(animate);

    }
}

// Wake Doraemon by hovering over
doraemonElement.addEventListener('mouseenter', function () {
    if (!isAwake) {
        wakeUpDoraemon();
        checkStatesPeriodically(); 
    }
});

// Check clicks to play anims
doraemonElement.addEventListener('click', function () {
    performRandomAction();
});