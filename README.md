# Task Manager

A simple task management app I built to practice vanilla JavaScript. It handles the basics – add, edit, delete, complete tasks – with filtering, sorting, and localStorage so your tasks don't disappear when you refresh.

## What it does

- Add tasks with title, description, and priority
- Edit or delete tasks
- Mark tasks complete
- Filter by priority, status, or search by title
- Sort alphabetically or by date
- Shows stats: total, completed, remaining, completion rate
- Saves everything to your browser

## How it's built

I split the code into modules:

- `taskStore.js` – handles data and localStorage
- `filterService.js` – filtering and sorting logic
- `renderer.js` – builds the UI
- `app.js` – ties everything together
- `dom.js` – keeps all DOM references in one place

This made the code cleaner and easier to manage.

## Run it

Open `index.html` with Live Server (or any local server).

## What I learned

- Organizing JavaScript without frameworks
- Using ES modules
- Event delegation
- Writing functions that do one thing

## Author

Olabinjo Olatunji
