
document.addEventListener('DOMContentLoaded', () => {
    const stopwatches = [
        { id: 1, milliseconds: 0, seconds: 0, minutes: 0, timer: null, isRunning: false },
        { id: 2, milliseconds: 0, seconds: 0, minutes: 0, timer: null, isRunning: false }
    ];

    function updateDisplay(stopwatchId) {
        const stopwatch = stopwatches[stopwatchId - 1];
        const display = document.querySelector(`#stopwatch${stopwatchId} #time`);
        display.textContent = `${String(stopwatch.minutes).padStart(2, '0')}:${String(stopwatch.seconds).padStart(2, '0')}:${String(stopwatch.milliseconds).padStart(2, '0')}.${String(stopwatch.milliseconds % 100).padStart(2, '0')}`;
    }

    function startTimer(stopwatchId) {
        const stopwatch = stopwatches[stopwatchId - 1];
        if (stopwatch.isRunning) return;
        stopwatch.isRunning = true;
        stopwatch.timer = setInterval(() => {
            stopwatch.milliseconds++;
            if (stopwatch.milliseconds >= 100) {
                stopwatch.milliseconds = 0;
                stopwatch.seconds++;
            }
            if (stopwatch.seconds >= 60) {
                stopwatch.seconds = 0;
                stopwatch.minutes++;
            }
            updateDisplay(stopwatchId);
        }, 10);
    }

    function stopTimer(stopwatchId) {
        const stopwatch = stopwatches[stopwatchId - 1];
        stopwatch.isRunning = false;
        clearInterval(stopwatch.timer);
    }

    function resetTimer(stopwatchId) {
        const stopwatch = stopwatches[stopwatchId - 1];
        stopwatch.isRunning = false;
        clearInterval(stopwatch.timer);
        stopwatch.milliseconds = 0;
        stopwatch.seconds = 0;
        stopwatch.minutes = 0;
        updateDisplay(stopwatchId);
        document.querySelector(`#stopwatch${stopwatchId} #lapList`).innerHTML = '';
    }

    function recordLap(stopwatchId) {
        const stopwatch = stopwatches[stopwatchId - 1];
        if (!stopwatch.isRunning) return;
        const lapTime = `${String(stopwatch.minutes).padStart(2, '0')}:${String(stopwatch.seconds).padStart(2, '0')}:${String(stopwatch.milliseconds).padStart(2, '0')}.${String(stopwatch.milliseconds % 100).padStart(2, '0')}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        document.querySelector(`#stopwatch${stopwatchId} #lapList`).appendChild(lapItem);
    }

    function setupStopwatch(stopwatchId) {
        document.querySelector(`#stopwatch${stopwatchId} #startStop`).addEventListener('click', () => {
            const stopwatch = stopwatches[stopwatchId - 1];
            if (stopwatch.isRunning) {
                stopTimer(stopwatchId);
                document.querySelector(`#stopwatch${stopwatchId} #startStop`).textContent = 'Start';
            } else {
                startTimer(stopwatchId);
                document.querySelector(`#stopwatch${stopwatchId} #startStop`).textContent = 'Stop';
            }
        });

        document.querySelector(`#stopwatch${stopwatchId} #reset`).addEventListener('click', () => {
            resetTimer(stopwatchId);
            document.querySelector(`#stopwatch${stopwatchId} #startStop`).textContent = 'Start';
        });

        document.querySelector(`#stopwatch${stopwatchId} #lap`).addEventListener('click', () => {
            recordLap(stopwatchId);
        });
    }

    setupStopwatch(1);
    setupStopwatch(2);
});




