# Lanjing (Maggie) Wang · Personal Website

Personal website of **Lanjing (Maggie) Wang**, PhD student in Biomedical Informatics
at the University of Washington.

## 🌐 Live site

**https://maggielanjingwang.github.io/maggiewang.github.io/**

- Home: https://maggielanjingwang.github.io/maggiewang.github.io/
- Other (flying, cooking, nature): https://maggielanjingwang.github.io/maggiewang.github.io/other.html

A custom, static site (no build step) served by GitHub Pages. The `.nojekyll` file
disables Jekyll so files are served exactly as-is, and `index.html` is served at the
site root.

## Structure

```
index.html              # homepage (About, Research, Experience, Publications, Contact)
other.html              # "Other" page (flying, cooking, nature gallery)
maggiew.html            # redirect to index.html (legacy filename)
assets/css/styles.css   # design system: light clinical, indigo/violet
assets/js/main.js       # scroll reveal, sticky nav, progress bar
assets/img/             # profile photo, favicon, org logos, nature photos
assets/cv/              # CV (PDF)
```

## Develop locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Update content

- **Text / sections**: edit `index.html` (or `other.html`).
- **CV**: replace the PDF in `assets/cv/` and keep the link in `index.html`.
- **Photo**: replace `assets/img/profile.jpg` (web-sized, ~800px, <150KB).
