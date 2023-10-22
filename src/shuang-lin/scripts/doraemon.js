let doraemonElement = document.querySelector('.doraemon');
let isAwake = false;
let isIdle = false;

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
        console.log("ERROR, not idle");
    }
}

function checkStatesPeriodically() {
    // Random anim every 20s
    setInterval(function () {
        if (isAwake && isIdle) {
            performRandomAction();
        }
    }, 20000);
}

doraemonElement.addEventListener('click', function () {
    if (!isAwake) {
        
        //debug
        console.log("Waking...");
        
        wakeUpDoraemon();
        checkStatesPeriodically(); // Start checking states after waking up
    } else {

        //debug
        console.log("Playing Random Anim...");

        performRandomAction();
    }
});
