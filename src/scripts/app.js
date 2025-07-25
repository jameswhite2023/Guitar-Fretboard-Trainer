// DOM Elements
const stringDisplay = document.getElementById('string-display');
const fretDisplay = document.getElementById('fret-display');
const timeLeftDisplay = document.getElementById('time-left');
const timerInput = document.getElementById('timer-input');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Variables
let timer = null;
let timeLeft = 5; // Default timer value
const strings = ['High E', 'A', 'D', 'G', 'B', 'Low E']; // Guitar strings

// Notes for each string (EADGBE tuning)
const guitarNotes = {
    'Low E': ['E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3'],
    'A': ['A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3'],
    'D': ['D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4'],
    'G': ['G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4'],
    'B': ['B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'],
    'High E': ['E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5']
};

// Function to play a note
function playNote(string, fret) {
    const note = guitarNotes[string][fret]; // Get the note for the string and fret
    if (!note) return;

    const synth = new Tone.Synth().toDestination(); // Create a synthesizer
    synth.triggerAttackRelease(note, '8n'); // Play the note for an eighth note duration
}

// Functions
function generateRandomStringAndFret() {
    const string = strings[Math.floor(Math.random() * strings.length)]; // Random string (High E, A, D, G, B, Low E)
    const fret = Math.floor(Math.random() * 13); // Random fret (0 to 12)
    stringDisplay.textContent = `String: ${string}`;
    fretDisplay.textContent = `Fret: ${fret}`;
    playNote(string, fret); // Play the corresponding note
}

function startTimer() {
    if (timer) return; // Prevent multiple timers
    timeLeft = parseInt(timerInput.value) || 5; // Get the user-defined timer value
    timeLeftDisplay.textContent = timeLeft;

    generateRandomStringAndFret(); // Generate the first string and fret

    timer = setInterval(() => {
        console.log(`Time left: ${timeLeft}`);
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft;
        } else {
            console.log('Time is up!');
            generateRandomStringAndFret(); // Generate a new string and fret when time runs out
            timeLeft = parseInt(timerInput.value) || 5; // Reset the timer
            timeLeftDisplay.textContent = timeLeft;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetGame() {
    clearInterval(timer);
    timer = null;
    timeLeft = parseInt(timerInput.value) || 5; // Reset to user-defined timer value
    timeLeftDisplay.textContent = timeLeft;
    stringDisplay.textContent = 'String: -';
    fretDisplay.textContent = 'Fret: -';
}

// Event Listeners
startBtn.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') {
        await Tone.start(); 
        console.log('Audio context started');
    }
    startTimer();
});
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetGame);