
const form = document.getElementById("workout-form");
const workoutList = document.getElementById("workout-list");
const emptyMessage = document.getElementById("empty-message");
const formMessage = document.getElementById("form-message");

const dateInput = document.getElementById("workout-date");

const STORAGE_KEY = "fittrack-workouts";

function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

dateInput.value = getLocalDateString();

function loadWorkouts() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const workouts = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(workouts)) {
            return [];
        }

        return workouts.filter(workout =>
            workout &&
            typeof workout.id === "string" &&
            typeof workout.exercise === "string" &&
            typeof workout.date === "string" &&
            typeof workout.type === "string"
        );
    } catch (error) {
        console.error("Could not load workout history:", error);
        return [];
    }
}

let workouts = loadWorkouts();

function saveWorkouts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
        return true;
    } catch (error) {
        console.error("Could not save workout history:", error);
        formMessage.textContent =
            "Unable to save. Check your browser storage settings.";
        return false;
    }
}

function getCurrentWeekStart() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const day = today.getDay();
    const daysSinceMonday = (day + 6) % 7;

    today.setDate(today.getDate() - daysSinceMonday);
    return getLocalDateString(today);
}

function updateStats() {
    const weekStart = getCurrentWeekStart();
    const today = getLocalDateString();

    document.getElementById("total-workouts").textContent =
        workouts.length;

    document.getElementById("total-exercises").textContent =
        workouts.length;

    document.getElementById("weekly-workouts").textContent =
        workouts.filter(workout =>
            workout.date >= weekStart &&
            workout.date <= today
        ).length;
}

function formatDate(dateString) {
    const parts = dateString.split("-").map(Number);

    if (parts.length !== 3 || parts.some(number => !number)) {
        return dateString;
    }

    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function createTextElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    element.textContent = text;
    return element;
}

function renderWorkouts() {
    workoutList.replaceChildren();

    emptyMessage.hidden = workouts.length > 0;

    const sortedWorkouts = [...workouts].sort((a, b) => {
        return b.date.localeCompare(a.date) ||
            b.id.localeCompare(a.id);
    });

    sortedWorkouts.forEach(workout => {
        const card = document.createElement("article");
        card.className = "workout-card";

        card.appendChild(
            createTextElement("span", "tag", workout.type)
        );

        card.appendChild(
            createTextElement("h3", "", workout.exercise)
        );

        card.appendChild(
            createTextElement(
                "p",
                "workout-date",
                formatDate(workout.date)
            )
        );

        card.appendChild(
            createTextElement(
                "p",
                "",
                `${workout.sets} sets × ${workout.reps} reps`
            )
        );

        card.appendChild(
            createTextElement(
                "p",
                "",
                `Weight: ${workout.weight} kg`
            )
        );

        card.appendChild(
            createTextElement(
                "p",
                "",
                `Duration: ${workout.duration} minutes`
            )
        );

        if (workout.notes) {
            card.appendChild(
                createTextElement("p", "", `Notes: ${workout.notes}`)
            );
        }

        const deleteButton = createTextElement(
            "button",
            "delete-btn",
            "Delete workout"
        );

        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            const confirmed = confirm(
                "Do you want to delete this workout?"
            );

            if (!confirmed) return;

            const previousWorkouts = workouts;

            workouts = workouts.filter(item => item.id !== workout.id);

            if (saveWorkouts()) {
                renderWorkouts();
                updateStats();
                formMessage.textContent = "Workout deleted.";
            } else {
                workouts = previousWorkouts;
                renderWorkouts();
                updateStats();
            }
        });

        card.appendChild(deleteButton);
        workoutList.appendChild(card);
    });

    updateStats();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const exercise = document.getElementById("exercise-name")
        .value.trim();

    const type = document.getElementById("workout-type").value;
    const date = dateInput.value;
    const sets = Number(document.getElementById("sets").value);
    const reps = Number(document.getElementById("reps").value);
    const weight = Number(document.getElementById("weight").value);
    const duration = Number(document.getElementById("duration").value);
    const notes = document.getElementById("notes").value.trim();

    if (
        !exercise ||
        !type ||
        !date ||
        date > getLocalDateString() ||
        !Number.isInteger(sets) || sets < 1 || sets > 100 ||
        !Number.isInteger(reps) || reps < 1 || reps > 1000 ||
        !Number.isFinite(weight) || weight < 0 || weight > 10000 ||
        !Number.isInteger(duration) || duration < 1 || duration > 1440
    ) {
        formMessage.textContent =
            "Please enter valid workout details and a date no later than today.";
        return;
    }

    const workout = {
        id: crypto.randomUUID(),
        date,
        type,
        exercise,
        sets,
        reps,
        weight,
        duration,
        notes
    };

    workouts.push(workout);

    if (!saveWorkouts()) {
        workouts.pop();
        return;
    }

    renderWorkouts();
    form.reset();
    dateInput.value = getLocalDateString();

    document.getElementById("sets").value = 3;
    document.getElementById("reps").value = 10;
    document.getElementById("weight").value = 0;
    document.getElementById("duration").value = 60;

    formMessage.textContent = "Workout saved successfully!";
});

document.getElementById("clear-history").addEventListener("click", () => {
    if (workouts.length === 0) {
        formMessage.textContent = "There is no workout history to clear.";
        return;
    }

    if (!confirm("Are you sure you want to delete all workout history?")) {
        return;
    }

    const previousWorkouts = workouts;
    workouts = [];

    if (saveWorkouts()) {
        renderWorkouts();
        formMessage.textContent = "All workout history cleared.";
    } else {
        workouts = previousWorkouts;
        renderWorkouts();
    }
});

renderWorkouts();
