# Localized game UI and Hong Kong festival events

## What will change
- Add one shared game-language dictionary for English, Traditional Chinese, and Simplified Chinese, using the language already saved in Settings.
- Apply it to every player-facing label, description, button, confirmation, empty/error state, accessibility label, and mouse-over across the game map, play screen, worlds, towers, Shop, Revision Bank, and Settings.
- Keep fixed game terms in their requested formats, including `中`, `ENG`, `MATH`, `LV`, and `EXP`.
- Replace the Event Isle’s three generic events with six seasonal specials: Lunar New Year, Easter, Mid-Autumn Festival, Halloween, Christmas, and Summer Holiday.
- Show only currently available specials on the isle. When none are active, keep the lock and show the next opening date in the selected language.
- Reuse the existing offline event artwork for the new specials so the downloaded app remains usable without internet.

## Festival schedule
- Use recurring Hong Kong seasonal windows for fixed-date events: Halloween, Christmas, and Summer Holiday.
- Store published year-specific dates for Lunar New Year, Easter, and Mid-Autumn Festival because they move each year.
- Handle Christmas windows that cross from December into January and calculate the next event correctly.
- Keep direct links to closed event worlds locked with a localized reopening message.

## Verification
- Switch among 繁體中文, 简体中文, and English and confirm game-linked pages, buttons, dialogs, tooltips, and accessibility labels change immediately after returning from Settings.
- Check the Event Isle for active/locked presentation and next-event calculation using representative dates for all six specials.
- Check desktop and mobile layouts, then confirm the app compiles without errors.

## Technical details
- Add typed translation helpers with interpolation and localized date formatting; no external runtime translation service is required.
- Extend festival metadata with translated names and testable date ranges, while preserving the existing world routing structure.
