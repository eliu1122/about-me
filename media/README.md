# media/

`index.html` references these exact filenames. Rename a file and you have to update its `src` too.

| File | Where it shows |
| --- | --- |
| `profile.jpg` | Contact portrait. 4:5 frame, cropped toward the top; adjust `object-position` in `.portrait img` |
| `fridayflicks.png` | FridayFlicks phone screenshot |
| `manim-lesson-builder/lesson.mp4`, `poster.jpg` | Manim math lesson and its poster frame |
| `manim-lesson-builder/history-lesson.mp4`, `history-poster.jpg` | Manim history lesson and its poster frame |
| `sec-simplifier/footnote-app.png` | Footnote app screenshot |
| `Yun_Chung_(Eric)_Liu_Resume.pdf` | Résumé link in Contact. Replace the file in place and bump "Updated …" in `index.html` |

Not yet used:

| File | Where it would show |
| --- | --- |
| `og-card.png` | 1200×630 link preview; uncomment the `og:image` tag in `index.html` |
| `bear-run/gameplay.mp4` | Bear Run, which links to itch.io for now |
