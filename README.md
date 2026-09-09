# Yun-Chung (Eric) Liu — personal site

Static site. No build step, no dependencies. Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All content. Edit copy here. |
| `css/styles.css` | Design tokens (colors, type scale) at the top in `:root`. |
| `js/main.js` | Nav, theme toggle, scroll reveals. |
| `media/` | Drop your images, videos, and slide exports here. |

## Adding media

Every empty box on the page is a `.media-slot`. Each one has an HTML comment
directly above it showing exactly what to paste in its place. The three forms:

**Image**
```html
<figure class="media">
  <img src="media/sec-simplifier/architecture.png" alt="Retrieval pipeline diagram">
  <figcaption>Hybrid BM25 + vector retrieval over a per-company index.</figcaption>
</figure>
```

**Video** (self-hosted mp4 — best for a screen recording of a demo)
```html
<figure class="media">
  <video src="media/sec-simplifier/demo.mp4" controls playsinline
         poster="media/sec-simplifier/demo-poster.png"></video>
  <figcaption>Asking about Apple's FY24 segment revenue.</figcaption>
</figure>
```

**Slides / embedded video** (Google Slides, YouTube, Loom, a PDF)
```html
<figure class="media media--embed">
  <iframe src="PASTE_EMBED_URL" title="SEC Simplifier deck"
          allowfullscreen loading="lazy"></iframe>
  <figcaption>Project walkthrough deck.</figcaption>
</figure>
```

**Profile photo**

Save it as `media/profile.jpg` — directly in `media/`, not a subfolder — and it appears in the
Contact section with no markup change. Until that file exists the page shows a labeled dashed
placeholder instead of a broken image. The frame is 4:5 and crops from
`object-position: center 22%` (in `.portrait img`), so a head-and-shoulders crop reads best.

See [`media/README.md`](media/README.md) for every path the page looks for.

To export Google Slides: File → Share → Publish to web → Embed, then paste the `src`.

Keep videos under ~20 MB if you host them on GitHub Pages; otherwise use a Loom/YouTube embed.

## Deploying to GitHub Pages

```bash
git add -A && git commit -m "Personal site"
git push -u origin main
```

Then Settings → Pages → Source: `main` / root.
