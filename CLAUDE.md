# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Quiz Web: Claude Code para Analytics Engineers** — a gamified true/false quiz educating Analytics Engineers about Claude Code tool, with progressive difficulty levels (Beginner → Intermediate → Advanced).

- **Stack:** HTML5 + CSS3 + Vanilla JavaScript (no frameworks, no build step)
- **Backend:** Supabase (PostgreSQL) for leaderboard persistence
- **Hosting:** Vercel (static site) + Supabase
- **Status:** live at https://quiz-claude-code-projeto-pedro.vercel.app/ (auto-deploys from `main`)

## Key Architecture

### Frontend Structure (`/js`)
- **`app.js`** — Main application logic: state management, screen navigation, quiz flow, timer handling, event listeners
- **`questions.js`** — Static question bank (30 total: 10 Beginner, 10 Intermediate, 10 Advanced); exported as `QUESTIONS` array
- **`supabaseClient.js`** — Supabase client initialization and leaderboard functions (insert score, fetch leaderboard)

### State Management
Quiz state is held in a single `state` object in `app.js`:
```javascript
const state = {
  playerName: "",
  playerEmail: "",
  level: "iniciante|intermediario|avancado|todos",
  questions: [], // shuffled questions for current quiz
  currentIndex: 0, // current question position
  score: 0,
  totalTimeSeconds: 0, // accumulated time across all questions
  timerId: null, // active timer interval ID
  timeLeft: 20, // seconds remaining on current question
  answered: false // whether current question answered
};
```

### Screen Flow
1. **Home** — Player name (required) + email (optional) + level selection → start quiz
2. **Question** — Display question + timer (20s default) + true/false buttons
3. **Feedback** — Show result (correct/incorrect) + explanation + next button
4. **Result** — Final score + Supabase ranking attempt + play again option
5. **Leaderboard** — Top 20 scores from `public_leaderboard` view (no emails exposed)

### Timer Logic
- Each question has a 20-second timer (configurable `TIME_PER_QUESTION`)
- Timer is a `setInterval` that updates UI and triggers auto-fail if expired
- **Important:** Always clear the timer when transitioning screens to avoid "ghost timers"
- Total quiz time is accumulated in `state.totalTimeSeconds` for leaderboard ranking

### Question Shuffling
- Within each level, 10 questions are shuffled (Fisher-Yates) per quiz session for variety
- "All levels" mode concatenates shuffled Beginner + Intermediate + Advanced (30 questions total)

## Supabase Integration

### Schema (`/supabase/schema.sql`)
```sql
leaderboard_entries  — stores player results (name, email, score, level, time)
public_leaderboard  — view (no email column) exposed to anon users
```

### RLS Policies
- **Anon role** can `INSERT` results but **cannot SELECT** from base table
- Only `public_leaderboard` view is readable by anon (protects emails)
- Credentials (Project URL + Anon Key) are in `js/supabaseClient.js`

### Error Handling
Supabase failures (network, service down) must not block the quiz:
- Always wrap calls in `try/catch`
- If save fails → display result normally with optional warning
- If leaderboard fetch fails → show "Unable to load ranking" gracefully

## Styling & Responsiveness

### Theme (`/css/style.css`)
- **Dark terminal aesthetic:** background near-black, text light gray, orange accents
- **Terminal window UI:** title bar with macOS-style dots, monospaced font (JetBrains Mono)
- **Layout:** Flexbox/Grid with mobile breakpoints (600px suggested)
- **Accessibility:** minimum 44×44px touch targets, adequate contrast, semantic HTML

### Key Classes
- `.screen` — each view (home, question, result, leaderboard); only `.active` is visible
- `.btn` — buttons; variants: `btn-primary` (orange), `btn-answer` (true=green, false=red), `btn-ghost` (outline)
- `.feedback-box` — hidden by default, shown after answer submitted
- `.timer-bar` — visual progress bar for countdown

## Common Development Tasks

### Add/Edit Questions
1. Open `js/questions.js`
2. Find the `QUESTIONS` array (30 objects)
3. Each question has: `id`, `nivel` (iniciante/intermediario/avancado), `categoria`, `enunciado`, `resposta` (boolean), `explicacao`
4. Keep questions balanced: ~10 per level

### Adjust Timer Duration
- Change `TIME_PER_QUESTION` constant in `app.js` (currently 20 seconds)
- Timer UI auto-updates in real time

### Deploy to Vercel
1. Push to main branch in Git (if connected)
2. Vercel auto-deploys static files
3. No build step needed (preset: "Other" / Static)

### Update Supabase Schema
1. Run SQL in Supabase dashboard → SQL Editor
2. Or use Supabase CLI to push migrations
3. Ensure RLS policies are maintained for privacy

## Testing & Verification

- **Quiz flow:** start → answer questions → view result → check leaderboard
- **Timer:** verify countdown works, auto-fails on expiry
- **Leaderboard:** insert dummy record, fetch and verify emails are not exposed
- **Responsiveness:** test on mobile (600px) and desktop (1024px+)
- **Error states:** simulate Supabase offline (dev tools network tab); confirm graceful degradation

## Naming & Code Conventions

- **Portuguese UI:** all user-facing text is in pt-BR (labels, buttons, messages)
- **Code language:** identifiers are in English; code comments are in Portuguese (match the surrounding code)
- **Camel case:** for JavaScript identifiers (`playerName`, `timeLeft`, `feedbackBox`)
- **Kebab case:** for HTML classes (`.question-meta`, `.timer-wrap`, `.btn-primary`)

## Privacy & Security Notes

- **Never hardcode `service_role` key** — only the anon/public key goes in frontend
- **Email privacy:** view `public_leaderboard` excludes email column; RLS prevents direct table access
- **No authentication in MVP:** anyone can submit results; mitigate spam in v2 with rate limiting or server validation
- **Sensitive data:** if adding personal info, ensure it flows through RLS policies

## Known Limitations & Future Improvements

- Questions are static (loaded from `questions.js`); migration to Supabase table is a v2 task
- No admin UI for question management in MVP
- Spam/fake scores possible (no server-side validation); add Edge Functions or reCAPTCHA in v2
- No user accounts; results cannot be edited/deleted once submitted
- Internationalization not implemented (pt-BR only)
