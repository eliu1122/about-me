# liu-eric.com

Yun-Chung (Eric) Liu's personal site. Plain HTML/CSS/JS, no build step; `main` deploys via GitHub Pages.

```bash
python -m http.server 8000   # http://localhost:8000
```

| Path | Contents |
| --- | --- |
| `index.html` | Page content |
| `footnote-prd.html` | Footnote PRD, linked from its project card |
| `caseline-prd.html` | Caseline PRD, not linked from the page yet |
| `css/styles.css` | Styles; tokens in `:root` |
| `js/main.js` | Nav, theme, slideshow, demos |
| `js/analytics.js` | PostHog tracking; `?notrack=1` excludes you |
| `media/` | Images, video, résumé; see [media/README.md](media/README.md) to add more |
