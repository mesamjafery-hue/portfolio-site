# Meesam Abbas — Portfolio

Personal portfolio of Meesam Abbas, Frontend / MERN Stack Developer.
Live: https://mesamjafery-hue.github.io/portfolio-site/

Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.
It deploys to GitHub Pages exactly as it is.

## Structure

```
index.html              Page markup (hero, about, projects, experience, skills, contact)
resume.html             Printable CV generated from the same content ("Save as PDF")
css/styles.css          All styles; theme colours are CSS variables at the top
js/data.js              ← All editable content: profile, projects, small builds, skills
js/main.js              Rendering, theme toggle, mobile menu, project details, contact form
assets/
  Meesam-Abbas-CV.pdf   File served by every "Download CV" button
  img/                  Optimised profile photo (WebP + JPEG, 320/640 px)
  fonts/                Self-hosted Geist variable fonts (SIL Open Font License)
                        Technology logos are inline SVGs from Simple Icons (CC0)
  favicon.svg, apple-touch-icon.png, og-image.jpg
.nojekyll               Tells GitHub Pages to serve files as-is
```

## Editing content

Everything recruiters read about projects lives in `js/data.js`.

- **Add a GitHub or live-demo link:** set `repo: "https://github.com/..."` or
  `demo: "https://..."` on a project. Buttons appear only when a link is set.
- **Add a screenshot:** put an image in `assets/projects/` and set
  `image: "assets/projects/taskflow.webp"`. It replaces the schematic cover.
  Extra images go in `screenshots: [{ src, alt }]` and show in the details panel.
- **Change the logo row under the hero:** edit `coreStack` in `data.js`.
- **Add a demo video:** put an MP4 in `assets/video/` and set
  `video: { src, poster, caption }` on the project. A "Watch demo" button appears
  on the card and the player opens in the details panel. (Nodaly already has one.)
- **Replace the CV:** overwrite `assets/Meesam-Abbas-CV.pdf` with your own PDF
  (keep the file name, or change `profile.cv` in `data.js`).

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) — a free form-to-email
service that works on static hosting.

1. After deploying, send yourself a test message from the live site.
2. FormSubmit emails **mesam.jafery@gmail.com** an activation link. Click it once.
3. Every message after that is delivered to your inbox.

If the service is unreachable, the form offers the visitor a pre-filled email instead.

## Run locally

Any static server works. From this folder:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000. (Opening `index.html` directly also works,
but the contact form needs to run from a server.)

## Deploy to GitHub Pages

```bash
git add -A
git commit -m "Redesign portfolio"
git push origin main
```

In the repository: **Settings → Pages → Build and deployment → Source: Deploy
from a branch → Branch: `main` / `(root)`**. All asset paths are relative, so the
site works under `/portfolio-site/`.
