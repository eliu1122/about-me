# Yun-Chung (Eric) Liu — personal site

Source for **[liu-eric.com](https://liu-eric.com)**. Plain HTML, CSS, and JavaScript: no build step, no dependencies.

```bash
python -m http.server 8000   # http://localhost:8000
```

Pushing to `main` deploys via GitHub Pages (Settings → Pages → `main` / root).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All page content. |
| `css/styles.css` | Styles; design tokens live in `:root` at the top. |
| `js/main.js` | Nav, theme toggle, scroll reveals. |
| `media/` | Images, videos, slides. [`media/README.md`](media/README.md) lists the expected paths. |
| `CNAME` | Custom domain. |

## Adding media

Put the file in `media/`, then paste a snippet where it belongs.

```html
<!-- Image -->
<figure class="media">
  <img src="media/project/architecture.png" alt="Architecture diagram">
  <figcaption>System overview.</figcaption>
</figure>

<!-- Video: self-hosted mp4 under ~20 MB; otherwise embed -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/demo-poster.png"></video>
  <figcaption>Demo walkthrough.</figcaption>
</figure>

<!-- Embed: Google Slides, YouTube, Loom, PDF -->
<figure class="media media--embed">
  <iframe src="PASTE_EMBED_URL" title="Project walkthrough" allowfullscreen loading="lazy"></iframe>
  <figcaption>Walkthrough deck.</figcaption>
</figure>
```

Google Slides embed URL: File → Share → Publish to web → Embed, copy the `src`.

The Contact portrait reads `media/profile.jpg` (4:5, head-and-shoulders). Without it, a labeled placeholder shows.
