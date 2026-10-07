# Yun-Chung (Eric) Liu — personal site

Source for **[liu-eric.com](https://liu-eric.com)**. Plain HTML, CSS, and JavaScript, with no build step. Pushing to `main` deploys via GitHub Pages.

```bash
python -m http.server 8000   # http://localhost:8000
```

| Path | What it is |
| --- | --- |
| `index.html` | All page content. |
| `css/styles.css` | Styles; design tokens in `:root` at the top. |
| `js/main.js` | Nav, theme toggle, scroll effects. |
| `media/` | Images, video, résumé. See [`media/README.md`](media/README.md). |

## Adding media

Drop the file in `media/` and paste one of these into `index.html`:

```html
<figure class="media">
  <img src="media/project/diagram.png" alt="Architecture diagram">
  <figcaption>System overview.</figcaption>
</figure>

<!-- mp4 under ~20 MB; anything bigger, embed instead -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/poster.jpg"></video>
</figure>

<!-- Google Slides (File → Share → Publish to web → Embed), YouTube, Loom, PDF -->
<figure class="media media--embed">
  <iframe src="EMBED_URL" title="Walkthrough" allowfullscreen loading="lazy"></iframe>
</figure>
```
