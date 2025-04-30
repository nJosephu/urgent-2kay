# 🚀 URGENT 2KAY – Frontend Codebase (React + TypeScript + Vite)

Welcome to the frontend codebase for **URGENT 2KAY**!  
This repo is set up for fast development, team collaboration, and clean architecture.

> 🛠 This is a living document — we’ll update it as the project grows.

## ⚙️ Tech Stack

- ⚛️ **React** (via Vite + TypeScript)
- 🎯 **Redux Toolkit** & Context API (for scalable state management)
- 🎨 **Tailwind CSS** _(or plain CSS if preferred)_
- 🔀 **React Router**
- 🐙 **Git + GitHub** for version control

### 🔗 Live Preview

https://urgent-2kay-frontend.vercel.app/

### 📚 Project Structure (From `src`)

| Path                    | Description                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `src/components`        | Reusable UI components (e.g., buttons, form fields, cards).       |
| `src/fonts`             | Custom fonts used in the application.                             |
| `src/hooks`             | Custom React hooks (e.g., useAuth, useFetch).                     |
| `src/images`            | Local image assets used throughout the UI.                        |
| `src/lib`               | Helper utilities, API functions, or third-party integrations.     |
| `src/pages`             | Main route-level pages (e.g., Login.tsx, Dashboard.tsx).          |
| `App.tsx`               | Root component that wraps the application.                        |
| `main.tsx`              | Vite entry point that mounts the React app.                       |
| `vite-env.d.ts`         | TypeScript declarations for Vite-specific types (auto-generated). |
| `App.css` / `index.css` | Global styles and Tailwind directives.                            |

### 🌱 Branch Strategy

We use a **Gitflow-like workflow**:

- `main` – stable code for production release
- `dev` – main development branch (all features merge here first)
- `feature/*` – for individual tasks/features (created from `dev`)

---

### ⚙️ Git Workflow Guide

#### 1. Clone the repository

```bash
   git clone https://github.com/designyamah/urgent-2kay-frontend.git
   cd urgent-2kay-frontend
```

#### 2. Install dependencies

```bash
   npm install
```

#### 3. Checkout the dev branch

```bash
   git checkout dev
   git pull origin dev # Always pull the latest changes
```

#### 4. Create a feature branch

git checkout -b yourname-feature/your-feature-name

🔸 Use clear, short names like `joseph-feature/login-form` or `chioma-feature/update-navbar`

#### 5. Work on your feature

- Make your changes
- Frequently commit your progress:
  git add .
  git commit -m "Add: implemented login form UI"

#### 6. Push your feature branch

git push -u origin feature/your-feature-name

#### 7. Create a Pull Request (PR)

- Go to GitHub
- Open a PR from `feature/your-feature-name` into `dev`
- Request a review from the team lead or another dev

❗ Do NOT push directly to `dev` or `main`. Always use feature branches and PRs.

🆕 Starting a New Feature After Merging
Once your previous PR has been approved and merged into dev, and you want to work on a new feature:

✅ First, update your local dev:

```bash
   git checkout dev
   git pull origin dev # Always pull the latest changes
```

✅ Then create a new feature branch based on the updated dev:

```bash
  git checkout -b yourname-feature/your-next-feature
```

---

### 🔒 Branch Protection

- `main` is for stable, production-ready code
- Only the **team lead** merges to `main` after testing
- All features must go through `dev` first via PRs (Pull Requests)

---

✅ Happy coding, team!
