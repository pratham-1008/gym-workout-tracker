
# FitTrack - Gym Workout Tracker

## 1. Project Introduction

FitTrack is a responsive gym workout tracking website developed
as part of the ISE-2 practical assignment for DevOps and Kubernetes.

The website allows users to record exercises, sets, repetitions,
weights, workout duration and notes. It also displays workout
statistics and workout history.

## 2. Project Objectives

- Create a functional and responsive website.
- Record and manage workout details.
- Track workout history using browser storage.
- Learn Git and GitHub version control.
- Integrate a DevOps tool and document the process.

## 3. Technology Stack

- HTML5: Website structure
- CSS3: Styling and responsive design
- JavaScript: Application functionality
- Git: Version control
- GitHub: Remote repository and collaboration
- Jenkins: DevOps automation and validation
- LocalStorage: Saving workout data in the browser

## 4. Project Setup

### Prerequisites

- A modern web browser
- Visual Studio Code or another code editor
- Git installed on the computer

### Run the Project

1. Clone the repository or download the project files.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` directly in a browser.
4. Add a workout and verify that it appears in the history.

No database or Node.js server is required for the basic website.

## 5. Main Features

- Responsive dashboard
- Workout logging form
- Exercise, sets, repetitions and weight tracking
- Workout duration and notes
- Workout history
- Delete individual workouts
- Clear workout history
- Weekly workout statistics
- Browser-based data persistence

## 6. Git and GitHub Workflow

1. Initialize a Git repository.
2. Track project changes using Git.
3. Create meaningful commits.
4. Push commits to GitHub.
5. Verify the repository and commit history.

Git commands used:

```bash
git init
git status
git add .
git commit -m "Your meaningful change description"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git branch -M main
git push -u origin main
```

Replace the repository URL with your actual GitHub repository URL.
Do not add the remote a second time if it is already configured.

## 7. Development Change Log

Record at least five actual changes here:

1. Initial HTML structure and navigation
2. Responsive CSS styling
3. Workout logging functionality
4. Workout history and deletion
5. Input validation and project documentation

## 8. DevOps Tool Integration

Tool: Jenkins

Document the actual Jenkins setup, job configuration, validation
commands, execution results and integration screenshots here
after completing the integration.

## 9. Screenshots and Evidence

Add screenshots demonstrating:

- Website dashboard
- Workout logging
- Workout history
- Git commit history
- GitHub repository
- Jenkins job configuration and successful execution

Store project evidence in the `screenshots/` folder and reference
the actual image filenames here.

## 10. Limitations

- Workout data is saved in the current browser's local storage.
- Data is not synchronized between different devices.
- Clearing browser storage may remove saved workouts.

## 11. Author

Student: [Your Name]

Subject: DevOps and Kubernetes

Assignment: ISE-2
