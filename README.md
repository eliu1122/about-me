# Yun-Chung (Eric) Liu — personal site

Source for **[liu-eric.com](https://liu-eric.com)**: plain HTML, CSS, and JavaScript, no build step. Pushing to `main` deploys via GitHub Pages.

```bash
python -m http.server 8000   # http://localhost:8000
```

| Path | What it is |
| --- | --- |
| `index.html` | Page content. |
| `css/styles.css` | Styles; design tokens in `:root`. |
| `js/main.js` | Nav, theme toggle, scroll effects. |
| `media/` | Images, video, résumé ([details](media/README.md)). |

## Adding media

Put the file in `media/` and add one of these to `index.html`:

```html
<figure class="media">
  <img src="media/project/diagram.png" alt="Architecture diagram">
  <figcaption>System overview.</figcaption>
</figure>

<!-- mp4 under ~20 MB; embed anything bigger -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/poster.jpg"></video>
</figure>

<!-- Google Slides (Publish to web → Embed), YouTube, Loom, PDF -->
<figure class="media media--embed">
  <iframe src="EMBED_URL" title="Walkthrough" allowfullscreen loading="lazy"></iframe>
</figure>
```
