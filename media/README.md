# media/ — where your files go

Filenames matter: the page references these exact names, so either match them or update
the `src` in `index.html`.

## Your photo

```
media/profile.jpg
```

Directly in this `media` folder, not a subfolder. Save it as `profile.jpg` and it appears
in the Contact section automatically. Until then the page shows a dashed "Photo" placeholder.

The frame is 4:5 and keeps the upper part of the image, so a head-and-shoulders crop looks
best. To change what it keeps, edit `object-position: center 22%` in `.portrait img` in
`css/styles.css`.

## What's in use now

| File | Where it shows |
| --- | --- |
| `profile.jpg` | Contact section portrait. |
| `fridayflicks.png` | FridayFlicks project — the tilting phone screenshot. |
| `sec-simplifier/footnote-app.png` | Footnote project — the app screenshot in its scrollable frame. |
| `eric-liu-resume.pdf` | Résumé link in Contact (add the file; the link already points at it). |

## Optional

| File | Where it would show |
| --- | --- |
| `bear-run/gameplay.mp4` | Not wired up — Bear Run currently links out to itch.io instead. |
| `og-card.png` | 1200×630 link-preview image; uncomment the `og:image` tag in `index.html`. |

To add a new image, drop the file in and put a `<figure class="media">` (or a `.shot` with
`data-label`/`data-path`) in `index.html` where you want it.
