## Purpose

This repository is a small static resume/portfolio site (HTML + CSS). The goal of this file is to give AI coding agents the exact, discoverable context needed to make safe, useful edits without wasting cycles on generic advice.

## Big picture

- Single-page static site: primary files are `CSS Assignment_ Complete the Resume/completing_resume.html` and `CSS Assignment_ Complete the Resume/main.css`.
- No backend, no build system, no tests. Changes are applied directly to the HTML and CSS files.
- Visual layout is implemented with CSS Flexbox and selector-based rules (no JS). Many layout behaviors rely on CSS nth-child selectors and utility classes.

## How to run & preview

- Quick preview: open `completing_resume.html` in a browser.
- Recommended: run a local static HTTP server from the project root to preserve correct relative paths. Example PowerShell commands:

```powershell
python -m http.server 8000

# or if using npm
npx http-server -p 8000
```

Then open the generated URL and navigate to `CSS%20Assignment_%20Complete%20the%20Resume/completing_resume.html`.

## Key files and patterns (do not change without reason)

- `completing_resume.html` — the single HTML page. Sections are divided by IDs: `#about`, `#skills`, `#experience`, `#education`, `#portfolio`, `#contact`.
- `main.css` — global styles. Pay attention to these project-specific patterns:
  - Skill bars: classes like `.eighty-five-percent`, `.eighty-percent`, `.fifty-percent` control the width of inner progress bars.
  - Color & utility classes: `.mb-blue`, `.mb-orange`, `.m-blue`, `.m0`, `.mb75px`, `.text-center` are reused across components — prefer reusing these instead of adding duplicates.
  - Timeline layout: `.timeline` / `.timeline-box` uses `:nth-child(2n)` / `:nth-child(2n+1)` selectors to place alternating timeline entries left/right — adding/removing wrapper nodes may change positioning.
  - Social icons: Font Awesome kit is loaded via `https://kit.fontawesome.com/b3348ae33f.js`. Changing/removing it affects icons site-wide.
  - Backgrounds & images: many images reference an external S3 bucket (ninjasfiles). These assets are external and not in the repo.

## Typical changes and safe edit patterns

- Visual tweaks: edit `main.css`. Search for the class or ID first (avoid creating near-duplicate classes).
- Adding a new skill: add a `div.skill-progress` with an inner div using an existing percentage class (e.g., `eighty-five-percent`) and a color class (e.g., `mb-orange`).
- Adding timeline items: append another `.timeline-box` sibling inside the `.timeline` container; rely on existing nth-child rules for left/right positioning.
- Contact form: it's static (`#contact-form`) with no submit handler. If you add JS for submission, place scripts in a new `js/` folder and include them at the end of `<body>`.

## Common pitfalls to avoid

- Do not rename the percentage classes (`eighty-five-percent`, `fifty-percent`) without updating all HTML references.
- Avoid restructuring the timeline DOM (wrapping boxes in extra elements) which will change nth-child counts and break alternation.
- Don't remove the Font Awesome kit script tag unless replacing it with another icon approach.

## Developer workflow notes

- There is no build/test pipeline. Use a browser + DevTools for CSS/layout debugging. Use a local static server when needed (examples above).
- Commit messages should be specific about visual changes (e.g., "tweak skill bar color, add AWS entry").

## Where to look for examples

- Skill blocks: search for `class="skill-progress"` in `completing_resume.html`.
- Timeline alternation: inspect `.timeline-box` and nth-child rules in `main.css`.

If any of the above assumptions are wrong or you expect a different project type, ask before making large changes.

---

Please review and tell me if you want stricter rules (naming conventions, commit checks, or automated previews) added.
