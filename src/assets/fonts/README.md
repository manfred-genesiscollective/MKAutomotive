# Fonts

All three typefaces are open source under the SIL Open Font License 1.1 (the
licence texts are in this folder) and are served from this site.

| File | Used for |
| --- | --- |
| `Saira-Variable.woff2`, `Saira-Italic-Variable.woff2` | Headings, names, figures, navigation and buttons |
| `Geist-Variable-latin.woff2` | Paragraphs |
| `GeistMono-Regular-latin.woff2` | Small labels |
| `Saira-ExtraBoldItalic.woff`, `Geist-Medium.ttf`, `GeistMono-Regular.ttf` | The share images drawn in `src/lib/og-image.tsx`, which cannot read WOFF2 |

Saira comes from the `@fontsource-variable/saira` and `@fontsource/saira`
packages (Latin subset). Geist and Geist Mono come from the `geist` package,
version 1.9.2.

The two `-latin` files are cut down to the characters this site can show:
Latin letters, punctuation, arrows and a few symbols. That makes them less
than half the size of the full fonts. They were made with fontTools:

```bash
pyftsubset Geist-Variable.ttf --flavor=woff2 --layout-features='*' \
  --unicodes="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FFFD" \
  --output-file=Geist-Variable-latin.woff2
```

and the same for `GeistMono-Regular.ttf`. If the site ever needs a character
outside that list (another script, for example), make the files again from
the full fonts with a wider range.

Saira has no arrows, so arrows inside Saira text are set in Geist (see
`.button-arrow` in `src/app/globals.css`).
