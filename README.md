# Yun-Chung (Eric) Liu — personal site

Software engineer & product builder at Cornell Tech, previously three years at Morningstar. Looking for Summer 2027 internships in forward-deployed engineering, AI product/product management, and software engineering.

Live at **[liu-eric.com](https://liu-eric.com)**, deployed from `main` via GitHub Pages.

A single static page in plain HTML, CSS, and JavaScript. No build step, no dependencies. Open `index.html`, or serve it locally:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All content. Edit copy here. |
| `css/styles.css` | Design tokens (colors, spacing, type scale) in `:root` at the top. |
| `js/main.js` | Nav, theme toggle, scroll reveals. |
| `media/` | Images, videos, slide exports. See [`media/README.md`](media/README.md) for the paths the page expects. |
| `CNAME` | Custom domain for GitHub Pages. |

## Adding media

Drop the file in `media/` and paste one of these where you want it.

**Image**
```html
<figure class="media">
  <img src="media/project/architecture.png" alt="Architecture diagram">
  <figcaption>System overview.</figcaption>
</figure>
```

**Video** (self-hosted mp4; keep it under ~20 MB, otherwise embed from YouTube/Loom)
```html
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/demo-poster.png"></video>
  <figcaption>Demo walkthrough.</figcaption>
</figure>
```

**Embed** (Google Slides, YouTube, Loom, PDF)
```html
<figure class="media media--embed">
  <iframe src="PASTE_EMBED_URL" title="Project walkthrough" allowfullscreen loading="lazy"></iframe>
  <figcaption>Walkthrough deck.</figcaption>
</figure>
```

For Google Slides: File → Share → Publish to web → Embed, then copy the `src`.

**Profile photo:** `media/profile.jpg` fills the Contact section portrait (4:5 frame, head-and-shoulders crops best). If it's missing, the page shows a labeled placeholder.

## Deploying

Push to `main`. GitHub Pages serves from Settings → Pages → Source: `main` / root.
