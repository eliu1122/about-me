# liu-eric.com

Personal site for Yun-Chung (Eric) Liu. Plain HTML/CSS/JS, no build step; pushing to `main` deploys via GitHub Pages.

```bash
python -m http.server 8000   # http://localhost:8000
```

| Path | Contents |
| --- | --- |
| `index.html` | Page content |
| `footnote-prd.html` | Footnote PRD, linked from the project |
| `css/styles.css` | Styles; design tokens in `:root` |
| `js/main.js` | Nav, theme toggle, scroll effects |
| `media/` | Images, video, résumé ([details](media/README.md)) |

## Adding media

Drop the file in `media/`, then add a figure to `index.html`:

```html
<figure class="media">
  <img src="media/project/diagram.png" alt="Architecture diagram">
  <figcaption>System overview.</figcaption>
</figure>

<!-- Keep mp4s under ~20 MB; embed anything bigger -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/poster.jpg"></video>
</figure>

<!-- Slides, YouTube, Loom, PDF -->
<figure class="media media--embed">
  <iframe src="EMBED_URL" title="Walkthrough" allowfullscreen loading="lazy"></iframe>
</figure>
```
