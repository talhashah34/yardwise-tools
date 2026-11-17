# VoXShift demo samples

These two files power **Try it before you upload** on the landing page.

| File | Role | What to record |
|------|------|----------------|
| `content-demo.wav` | Words & timing to keep | 5–12s clear speech (one short line or sentence) |
| `target-demo.wav` | Voice character to lean into | 5–15s clear speech from a different speaker |

## Tips for a convincing preview

- Dry room, little echo, no music
- Same language / similar loudness on both clips
- Target should *sound* different from content (higher vs lower, brighter vs darker)
- WAV or MP3 is fine; name them exactly as above if you replace files

## How to replace (Windows)

```bat
cd /d D:\yardwise-tools\voxshift-web\public\examples
copy /Y "C:\path\to\your-content.wav" content-demo.wav
copy /Y "C:\path\to\your-target.wav" target-demo.wav
```

Then rebuild / refresh the site. The live demo button runs the real converter on these files in the browser.

You can also send the two clips in chat and we will drop them in for you.
