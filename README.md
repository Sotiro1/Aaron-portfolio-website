# Aaron Sotiropoulos: Portfolio

My personal portfolio site. It's plain HTML, CSS and JavaScript with no build step, deployed to GitHub Pages.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: about, experience, projects, skills, education, contact |
| `pitch-finder.html` | Pitch Finder SA case study |
| `nisteia.html` | Νηστεία (Nisteia) case study |
| `ldc.html` | LDC Strategies automation workflows |
| `kicco.html` | Kicco finance dashboard prototype |
| `contact.html` | Contact form (Formspree) |
| `thankyou.html` | Shown after the contact form is sent |
| `profile.html` | Redirects to `index.html#experience` (old URL) |

Images and the resume PDF are in `assets/`.

## Running locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Deploying

Pushing to `main` deploys the site through `.github/workflows/static.yml`.

To update the resume, replace `assets/Aaron_Sotiropoulos_Resume.pdf` and keep the same filename.
