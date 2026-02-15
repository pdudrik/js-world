function formatTime(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function updateClock() {
    const now = new Date();
    let time = [
        formatTime(now.getHours()),
        formatTime(now.getMinutes()),
        formatTime(now.getSeconds())
    ].join(":");
    
    document.getElementById("clock").innerHTML = time;

}

function updateStopwatchClock() {
    stopwatchTime.seconds++;
    if (stopwatchTime.seconds == 59) {
        stopwatchTime.seconds = 0;
        stopwatchTime.minutes++;
    }
    else if (stopwatchTime.minutes == 59) {
        stopwatchTime.minutes = 0;
        stopwatchTime.hours++;
    }
    
    document.getElementById("stopwatch").innerHTML = [
        formatTime(stopwatchTime.hours),
        formatTime(stopwatchTime.minutes),
        formatTime(stopwatchTime.seconds)
    ].join(":");
}

function showPage(page) {
    page = page + "_page";
    console.log("current page: " + currentPage);
    console.log("new page: " + page);

    document.getElementById(currentPage).style["display"] = "none";
    document.getElementById(page).style["display"] = "flex"
    currentPage = page;
}


function validInput(input, min, max) {
    if (input.validity.badInput) {
        console.log("Invalid input")
        return false;
    }
    if (input.value.trim() == "") {
        return 0;
    }

    let num = parseInt(input.value);
    if (num < min || num > max) {
        return false;
    }

    return num;
}


function updateTimerClock() {
    if (timerTime.seconds == 0) {
        timerTime.seconds = 59;
        if (timerTime.minutes == 0) {
            timerTime.minutes = 59;
            timerTime.hours--;
        }
        timerTime.minutes--;
    }
    else {
        timerTime.seconds--;
    }

    document.getElementById("timer").innerHTML = [
        formatTime(timerTime.hours),
        formatTime(timerTime.minutes),
        formatTime(timerTime.seconds)
    ].join(":");

    if (timerTime.hours == 0 && timerTime.minutes == 0 && timerTime.seconds == 0) {
        clearInterval(timerInterval);
        timerTime = undefined;          // reset timer
        document.getElementById("timer_control_button").innerHTML = "Start";
        alert("Timer has ended");
    }
}


var currentPage = "clock_page";
var stopwatchRunning = false;
var timerRunning = false;
var timerPaused = false;
var stopwatchTime = {
    "hours": 0,
    "minutes": 0,
    "seconds": 0
};


console.log("current: " + currentPage);

updateClock()
setInterval(updateClock, 1000);
var stopwatchInterval, timerInterval, timerTime;


document.getElementById("show_clock").addEventListener("click", function() {
    showPage("clock");
});
document.getElementById("show_timer").addEventListener("click", function() {
    showPage("timer");
});
document.getElementById("show_stopwatch").addEventListener("click", function() {
    showPage("stopwatch");
});

document.getElementById("stopwatch_control_button").addEventListener("click", function() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatchClock, 1000);
        stopwatchRunning = true;
        this.innerHTML = "Pause";
    }
    else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        this.innerHTML = "Start";
    }
});

document.getElementById("stopwatch_reset_button").addEventListener("click", function() {
    stopwatchRunning = false;
    stopwatchTime.hours = 0;
    stopwatchTime.minutes = 0;
    stopwatchTime.seconds = 0;
    clearInterval(stopwatchInterval);

    document.getElementById("stopwatch").innerHTML = [
        formatTime(stopwatchTime.hours),
        formatTime(stopwatchTime.minutes),
        formatTime(stopwatchTime.seconds)
    ].join(":");
    document.getElementById("stopwatch_control_button").innerHTML = "Start";
});

document.getElementById("timer_control_button").addEventListener("click", function() {
    // Pressed start
    if (!timerRunning) {
        timerRunning = true;
        timerPaused = false;
        this.innerHTML = "Pause";

        if (timerPaused || timerTime == undefined) {
            timerTime = {
                "hours": validInput(document.getElementById("timer_hours_input"), 0, 99),
                "minutes": validInput(document.getElementById("timer_minutes_input"), 0, 59),
                "seconds": validInput(document.getElementById("timer_seconds_input"), 0, 59)
            };
            
            console.log(timerTime);
            if (timerTime.hours === false || timerTime.minutes === false || timerTime.seconds === false) {
                alert("Invalid time input");
                return;
            }
        }
        
        document.getElementById("timer").innerHTML = [
            formatTime(timerTime.hours),
            formatTime(timerTime.minutes),
            formatTime(timerTime.seconds)
        ].join(":");

        timerInterval = setInterval(updateTimerClock, 1000);
    }
    // Pressed pause
    else {
        timerRunning = false;
        timerPaused = true;
        this.innerHTML = "Start";
        clearInterval(timerInterval);
    }
});

document.getElementById("timer_reset_button").addEventListener("click", function() {
    timerTime = {
        "hours": validInput(document.getElementById("timer_hours_input"), 0, 99),
        "minutes": validInput(document.getElementById("timer_minutes_input"), 0, 59),
        "seconds": validInput(document.getElementById("timer_seconds_input"), 0, 59)
    };
    
    console.log(timerTime);
    if (timerTime.hours === false || timerTime.minutes === false || timerTime.seconds === false) {
        alert("Invalid time input");
        return;
    }

    document.getElementById("timer").innerHTML = [
        formatTime(timerTime.hours),
        formatTime(timerTime.minutes),
        formatTime(timerTime.seconds)
    ].join(":");
});