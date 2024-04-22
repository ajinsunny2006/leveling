let completed = {
    pushups: 0,
    situps: 0,
    squats: 0,
    legraises: 0,
    boatpose: 0,
    hiplift: 0,
    run: 0
};

let currentLevel = 1;

// Check local storage for saved progress
if (localStorage.getItem('completed')) {
    completed = JSON.parse(localStorage.getItem('completed'));
    updateLevel();
}

function completeActivity(activity) {
    completed[activity]++;
    if (completed[activity] >= 50 && activity !== 'run') {
        levelUp();
    } else if (activity === 'run' && completed[activity] >= 5) {
        levelUp();
    }
    updateLevel();
    saveProgress();
}

function levelUp() {
    currentLevel++;
    let levelUpMessage = document.getElementById('levelUpMessage');
    levelUpMessage.style.display = 'block';
    setTimeout(function() {
        levelUpMessage.style.display = 'none';
    }, 2000); // Hide message after 2 seconds

    // Reset all activity counts
    for (let activity in completed) {
        completed[activity] = 0;
    }

    saveProgress(); // Save progress after leveling up
}

function updateLevel() {
    let levelElement = document.getElementById('level');
    levelElement.textContent = currentLevel;
}

function saveProgress() {
    localStorage.setItem('completed', JSON.stringify(completed));
}

// Initial update of the displayed level
updateLevel();
