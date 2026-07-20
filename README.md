# ✈️ Flight Deck — Job Application Tracker

> A job application tracker styled as an airport departure board —
> because job hunting is a control tower operation.

🔗 **Live Demo:** [flight-deck-job-tracker.vercel.app](https://flight-deck-job-tracker.vercel.app)

---

## 📌 Problem Statement

Job hunting means juggling dozens of applications across different companies, roles, and stages — and it's incredibly easy to lose track of who you applied to, when, and who still needs a follow-up. Spreadsheets get messy fast, and important follow-ups slip through the cracks. Flight Deck replaces that mess with a focused tool that tracks every application, flags the ones that need attention, and gives a clear picture of the whole pipeline at a glance.

## ✨ Features

- **Add / edit / delete applications** — company, role, date applied, status, company type, HR contact email, and notes
- **Status pipeline** — Applied → Interview → Offer / Rejected, color-coded for quick scanning
- **Automatic follow-up flag** — any application stuck at "Applied" for 7+ days with no update gets flagged automatically
- **Search & filter** — find applications by company or role, filter by status
- **Sort** — newest or oldest first
- **Live stats dashboard** — total applications, breakdown by status, and success rate, updated in real time
- **Visual status chart** — a horizontal breakdown bar showing the ratio of Applied/Interview/Offer/Rejected
- **CSV export** — download your full application history in one click
- **Dark / light mode** — respects your system preference and remembers your choice
- **Toast notifications** — instant confirmation when you save, update, or delete an application
- **Fully local** — everything lives in your browser's `localStorage`; nothing is ever sent to a server

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **Vanilla JavaScript (ES6+)** — no frameworks, no build step
- **Tailwind CSS** — utility-first styling, loaded via CDN
- **localStorage** — client-side data persistence
- **Google Fonts** — Space Grotesk, Inter, IBM Plex Mono

## 📁 Project Structure

```
flight-deck/
├── index.html                     → Entry point, loads all scripts in order
├── README.md
├── src/
│   ├── App.js                     → All UI rendering logic (header, stats, toolbar, cards, modal)
│   ├── index.js                   → App bootstrap — initializes data and triggers first render
│   │
│   ├── hooks/
│   │   └── useApplications.js     → CRUD logic (add, update, delete) + in-memory state
│   │
│   ├── utils/
│   │   ├── storage.js             → localStorage read/write helpers
│   │   ├── date.js                → date formatting, days-since, follow-up calculation
│   │   └── validators.js          → form validation before save
│   │
│   ├── constants/
│   │   └── statusConfig.js        → single source of truth for status colors/labels
│   │
│   └── styles/
│       └── style.css              → animations, dark mode contrast fixes, scrollbar styling
```

## 🚀 Getting Started / How to Run Locally

No build step, no dependencies to install — it's plain HTML/JS.

```bash
git clone https://github.com/YOUR-USERNAME/flight-deck-job-tracker.git
cd flight-deck-job-tracker
```

Then either:
- Open `index.html` directly in your browser, **or**
- Serve it locally for the best experience (recommended if using VS Code's Live Server extension):
  - Right-click `index.html` → **Open with Live Server**

## 🎯 What I Learned

Building the follow-up logic meant working with real date-diff calculations rather than just displaying stored dates. The CSV export forced me to handle edge cases like commas and quotes inside user-entered text so the file doesn't break when opened in Excel. Implementing dark mode properly — rather than just inverting colors — meant designing a real token-based color system in Tailwind and testing contrast in both themes for every component, including form inputs and status badges. Structuring the app into separate files (hooks, utils, constants) without a framework also meant being disciplined about which file owns which responsibility, so the codebase stays readable as features were added incrementally.

## 📬 Connect With Me

- LinkedIn: [linkedin.com/in/faisalmehmood807](https://www.linkedin.com/in/faisalmehmood807/)
- GitHub: [github.com/FaisalMagray21](https://github.com/FaisalMagray21?tab=repositories)

## 📄 License

MIT