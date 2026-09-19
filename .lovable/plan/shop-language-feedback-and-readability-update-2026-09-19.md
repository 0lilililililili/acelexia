# Shop, language, feedback, and readability update

## What will change
- Redesign the Star Shop exchange as: yellow star → quantity slider → one selected destination colour, with “or” between choices.
- Replace written star prices with a number and coloured star symbol, add the prepared market-stall artwork at 50% opacity, and require confirmation before purchases or exchanges.
- Rename “Your revision plan” to “Re-quiz plan,” remove its calculation explanation, and remove the old Re-quiz button/link.
- Soften the world-map artwork and the homepage pirate-map artwork so overlaid content is easier to read.
- Add an occasional, dismissible `/game` feedback dialog with a 1–5 rating and optional improvement comment, remembering when it was shown.
- Add a Settings language choice: Traditional Chinese (default), Simplified Chinese, or English.
- Apply language rules to generated gameplay: ENG stays English; 中 uses Traditional or Simplified Chinese; MATH wording follows the selected language.

## Technical details
- Extend saved settings with a language value and keep compatibility with existing accounts.
- Pass the selected language into question generation and its cache key so changing language refreshes generated content correctly.
- Add accessible dialog, slider, selection, and confirmation states without changing star values or item effects.
- Keep the removed `/requiz` page file intact but remove its Revision Bank entry point, avoiding unrelated route changes.
- Verify shop, settings, homepage, game map, and language-sensitive gameplay at desktop and mobile sizes.
