# media/ — where your files go

Every path the site looks for is listed below. Filenames matter: the page references these
exact names, so either match them or update the `src` in `index.html`.

## Your photo — put it right here

```
media/profile.jpg
```

Not in a subfolder — directly in this `media` folder, next to this README. Save it as
`profile.jpg` (lowercase `.jpg`) and it appears in the Contact section of the site
automatically. Until then the page shows a dashed "Photo" placeholder in its spot.

The frame is 4:5 (portrait) and keeps the upper part of the image, so a head-and-shoulders
crop looks best. To change what the frame keeps, edit `object-position: center 22%` in
`.portrait img` in `css/styles.css`.

## Everything else

| Folder / file | What the page expects |
| --- | --- |
| `profile.jpg` | Your photo, in the Contact section. |
| `eric-liu-resume.pdf` | Your résumé, linked from Contact. |
| `sec-simplifier/demo.mp4` | Demo screen recording. Optional poster frame: `demo-poster.png`. |
| `sec-simplifier/architecture.png` | Pipeline diagram. |
| `sec-simplifier/eval.png` | Golden-set / baseline-tracking screenshot. |
| `fridayflicks/` | App screenshots or a short clip. Name files whatever you like. |
| `bear-run/gameplay.mp4` | A clip of a run, or the title screen. |
| `work/morningstar/` | Publicly shareable screens or diagrams. |
| `work/ford/` | Conversion dashboard screenshot or chart. |
| `og-card.png` | Optional 1200×630 link-preview image (uncomment the tag in `index.html`). |

For anything other than `profile.jpg`, you also swap the dashed placeholder in `index.html`
for a real `<figure>` — the markup for images, video, and slide embeds is in the comment
block above the first media slot, and in the README at the project root.

The `.gitkeep` files just keep these empty folders in git. Delete them once a folder has
real files in it, or leave them alone — they do no harm.
