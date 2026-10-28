# liu-eric.com

Yun-Chung (Eric) Liu's personal site. Plain HTML/CSS/JS, no build step; `main` deploys via GitHub Pages.

```bash
python -m http.server 8000   # http://localhost:8000
```

| Path | Contents |
| --- | --- |
| `index.html` | Page content |
| `footnote-prd.html` | Footnote PRD |
| `css/styles.css` | Styles; tokens in `:root` |
| `js/main.js` | Nav, theme, scroll effects, demos, bears |
| `js/analytics.js` | PostHog tracking; `?notrack=1` excludes you |
| `media/` | Images, video, résumé ([details](media/README.md)) |

## Adding media

Drop the file in `media/` and add a figure to `index.html` (`<img>` works the same way):

```html
<!-- mp4s under ~20 MB; embed anything bigger (Slides, YouTube, Loom, PDF) -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/poster.jpg"></video>
</figure>
<figure class="media media--embed">
  <iframe src="EMBED_URL" title="Walkthrough" allowfullscreen loading="lazy"></iframe>
</figure>
```
