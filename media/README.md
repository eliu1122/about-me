# media/

`index.html` uses these exact filenames, so a rename means updating its `src` too.

| File | Where it shows |
| --- | --- |
| `profile.jpg` | Contact portrait, 4:5, cropped toward the top (`object-position` in `.portrait img`) |
| `fridayflicks.png` | FridayFlicks phone screenshot |
| `manim-lesson-builder/lesson.mp4`, `poster.jpg` | Manim math lesson and its poster frame |
| `manim-lesson-builder/history-lesson.mp4`, `history-poster.jpg` | Manim history lesson and its poster frame |
| `sec-simplifier/footnote-app.png` | Footnote app screenshot |
| `Yun_Chung_(Eric)_Liu_Resume.pdf` | Résumé links in the nav and Contact. Replace the file in place and bump "Updated …" in `index.html` |
| `og-card.png` | 1200×630 link preview; re-render it if the headline changes |

`bear-run/`, `fridayflicks/` and `work/` are empty placeholders for future media.

## Adding media

Put the file in `media/` and add a figure to `index.html` (`<img>` works the same way):

```html
<!-- mp4s under ~20 MB; embed anything bigger (Slides, YouTube, Loom, PDF) -->
<figure class="media">
  <video src="media/project/demo.mp4" controls playsinline poster="media/project/poster.jpg"></video>
</figure>
<figure class="media media--embed">
  <iframe src="EMBED_URL" title="Walkthrough" allowfullscreen loading="lazy"></iframe>
</figure>
```
