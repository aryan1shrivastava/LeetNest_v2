# LeetNest - Cursor Instructions

This document contains instructions for Cursor when making any design/UI improvements in the **LeetNest** application.

## ✅ General Rules

- Only modify files that are explicitly mentioned in the prompt.
- Do not change functionality unless specified (e.g., don't rewrite logic).
- Keep component structure and imports intact unless asked to refactor.
- Only apply changes related to styling, layout, responsiveness, and UX improvements.
- Use **TailwindCSS** for styling (no raw CSS).
- Avoid adding new libraries or dependencies unless absolutely necessary.

## 🎨 Color Theme: Nature-Inspired Dark Mode

Use a nature-inspired dark theme:

| Purpose        | Color Code                                |
| -------------- | ----------------------------------------- |
| Background     | `bg-gray-900`                             |
| Surface        | `bg-gray-800`                             |
| Primary Text   | `text-white`                              |
| Secondary Text | `text-gray-300`                           |
| Accent         | `text-green-400` / `hover:text-green-300` |
| Success        | `text-emerald-400`                        |
| Error          | `text-red-500`                            |
| Button Primary | `bg-green-600 hover:bg-green-700`         |
| Input Border   | `border-gray-600`                         |

## 🌿 Product Overview: LeetNest

LeetNest is a **coding practice platform** inspired by LeetCode/HackerRank.

### Key Features:

- User login/signup
- Problem listing and solving
- Code submission and execution
- Playlists of problems
- Profile & settings

### Target Design Goals:

- Modern, clean, and minimal
- Nature-inspired dark mode
- Mobile responsive
- Clear hierarchy and visual balance

### Prompt Format

Each prompt will specify:

- File path
- Goal (what needs improvement)
- Constraints (optional)

Only do what is explicitly asked in the prompt.

Do not assume anything else.

Do not change the flow of the application on your own, until asked explicitly.
