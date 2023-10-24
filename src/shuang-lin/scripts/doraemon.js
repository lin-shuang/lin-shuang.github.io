let doraemonElement = document.querySelector('.doraemon');
let heroElement = document.querySelector('.hero');
var cursorImage = document.createElement('img');
let isAwake = false;
let isIdle = false;
let isWalking = false;
let inHero = false;
let deltaX = 0;

// Set up dorayaki cursor
cursorImage.src = './src/shuang-lin/images/doraemon/cursor/cursor-dorayaki.png';
cursorImage.className = 'cursor-image';
document.body.appendChild(cursorImage);


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

        // Sit (1/3) or stand (2/3)
        let sitOrStand = Math.floor(Math.random() * 3);
        if(sitOrStand == 0){
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/idle/doraemon-sit.gif')";
        }
        else{
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/idle/doraemon-idle.gif')";
        }
    }
}

// Perform 27 random actions
function performRandomAction() {
    if (isIdle) {
        isIdle = false;
        let randomGifNumber = Math.floor(Math.random() * 27) + 1;
        doraemonElement.style.backgroundImage = `url('./src/shuang-lin/images/doraemon/random/doraemon-random-${randomGifNumber}.gif')`;
        
        // Random action play for 3s
        setTimeout(function () {
            setIdleState();
        }, 5000);
    }
}

function checkStatesPeriodically() {
    // Every 5s, 2/3 to random walk, 1/3 to random act
    setInterval(function () {
        if (isAwake && isIdle && !inHero) {
            cursorImage.style.opacity = 0; // Hide dorayaki
            let walkOrAct = Math.floor(Math.random() * 3);

            if(walkOrAct == 0){
                performRandomAction();
            }
            else{
                startWalking(-1); // -1 to trigger random walk
            }
        }
    }, 5000); //debug
}

function startWalking(targetPosition) {
    if (isAwake && isIdle) {
        // Get doraemon position
        let initialX = parseFloat((getComputedStyle(doraemonElement).left+50) || 0);

        // Follow cursor
        if(inHero && targetPosition != -1){    
            deltaX = targetPosition - initialX;
        }
        // Random walk
        else if(!inHero){ 
            const pageWidth = document.body.clientWidth;
            const range1 = [-pageWidth/3, -20];
            const range2 = [20, pageWidth/3];
            const randomRange = Math.random() < 0.5 ? range1 : range2;
            const randomX = Math.random() * (randomRange[1] - randomRange[0]) + randomRange[0];
            deltaX = randomX - initialX;
        }
        
        // Check direction
        if(deltaX > 0){
            doraemonElement.style.transform = "scaleX(1)"; // No flip, default
        }
        else if(deltaX < 0){
            doraemonElement.style.transform = "scaleX(-1)"; // Flip horizontally
        }

        // Check if should run
        let walkSpeed = 50; // Default 50
        isWalking = true;
        isIdle = false;
        if(deltaX > 125 || deltaX < -125){ // Run
            walkSpeed = 150;
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/moving/doraemon-run.gif')";
        }
        else{ // Walk
            doraemonElement.style.backgroundImage = "url('./src/shuang-lin/images/doraemon/moving/doraemon-hop.gif')";
        }
        // Calculate duration
        const animationDuration = Math.max(500, (Math.abs(deltaX) / walkSpeed) * 1000);

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


// Doraemon follows cursor
heroElement.addEventListener('mouseenter', function (e) {
    inHero = true;

    // Show dorayaki
    cursorImage.style.opacity = 1;
});
heroElement.addEventListener('mouseleave', function (e) {
    inHero = false;

    // Hide dorayaki
    cursorImage.style.opacity = 0;
});

// Follow cursor function
function cursorActivity(e) {
    // Turn back on every mouse activity
    inHero = true;
    cursorImage.style.opacity = 1;

    // Calculate the cursorX as the distance between the cursor's x-coordinate and page center
    let targetX = e.pageX - document.body.clientWidth/2;

    // Check if the cursor has moved over threshold
    if (Math.abs(targetX) >= 50) {
        startWalking(targetX);
    }

    //  Check cursor for 5s inactivity
    setInterval(function () {
        if(isIdle){
            inHero = false;
        }
    }, 5000);

    // Dorayaki follows cursor
    cursorImage.style.left = e.clientX-15 + 'px';
    cursorImage.style.top = e.clientY+15 + 'px';
}
heroElement.addEventListener('mousemove', cursorActivity);
heroElement.addEventListener('click', cursorActivity);