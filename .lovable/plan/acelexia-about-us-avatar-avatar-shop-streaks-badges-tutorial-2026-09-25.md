# Acelexia: About Us, Avatar, Avatar Shop, Streaks, Badges, Tutorial

This is a big update, so I'll build it in 4 stages. Each stage gets checked before the next one starts, so if we get interrupted partway the game still works.

## Stage 1: About Us page, editable by admin
- A question-mark icon in the top-left corner of the homepage opens `/about`.
- The page is made of blocks: headings, text boxes and pictures, laid out like a GitHub README.
- In the admin area, a new "About page" editor lets you add, edit, reorder and delete blocks, and upload pictures. Changes are saved online.
- The page starts with a ready-made "Data & Privacy" section, split into parts:
  - Collected for the game: username, a scrambled (hashed) password, grade, avatar gender, progress, stars, revision bank, streaks and badges.
  - Research input data: anonymous answers and timings, with no name attached.
  - Collected by the hosting platform (Lovable): basic hosting and error logs.
  - Cache and on-device data: login session, settings and offline graphics.
  - Speech: processed by the browser, with no recordings kept.
  - Security measures: private data locked down, admin actions need the password, and a reminder that you can log out at any time.

## Stage 2: Avatar and shops
- **Sign-up** gets a gender choice (Boy / Girl) with a clear note: "Only used to choose your avatar's body. Nothing else." If nothing is picked, it defaults to boy.
- **/avatar** (a button in the bottom-right corner of the map) shows a live preview of the avatar. There are tabs for Skin, Hair, Face, Shirt, Pants/Dress, Shoes, Hats, Belts and Weapons (bow, sword, dagger, magic staff). Every item is shown; locked items have a lock on top. New players get plain beginner clothes.
- The avatar is drawn in layers with built-in cartoon drawings, so it works offline and every combination fits together.
- **The Shop is split into two:**
  - `/shop` becomes a small hub with two doors.
  - `/tools` holds the hour-glasses, potions and torches, plus the yellow-star exchange, all unchanged.
  - `/avatarshop` has sub-pages for each category (for example `/avatarshop/weapons`). Items unlock by LV, and some also cost stars. Every item at LV20 or higher has its own unique extra requirement, for example "LV20 + 3 red", "LV25 + 5 blue" or "LV30 + 2 red + 2 green".

## Stage 3: Daily streak and badges
- **Daily popup** on the first login each day shows:
  - your current streak and best streak
  - how many days until your next streak badge
  - today's 3 daily practices, one each for 中, ENG and MATH, each in a randomly picked land (Aquatic, Forest or Fire; festival events are not included)
- Daily practices give stars the normal way, but each star has about a 10% chance of turning yellow.
- **Badge board** button next to Revision bank. Tabs: 中 / ENG / MATH / Others.
  - Subject badges: getting 5, 10 or 20 answers right in a row, and clearing tower levels 10, 30, 50, 80, 100, 200 and 500.
  - Other badges: reaching LV 10, 20, 50 and 100; daily streaks (1 and 2 weeks, 1 to 6 months, 100, 200 and 300 days, 1 year); keeping 50 of one star colour saved; collecting all weapons, all hats or a full outfit.
  - Locked badges show greyed out with their goal.

## Stage 4: How-to-play tutorial
- A step-by-step guide runs the first time someone signs up or logs in. It covers the map, towers, speaking, stars, the Shop, Avatar, Revision bank, Badges, streaks and Settings.
- It has a Skip button and Back/Next buttons.
- A "How to play" button next to the Avatar button replays it any time.
- All new wording works in 繁體中文, 简体中文 and English.

## Admin "code" page
- The code page updates automatically to include every new page and file. The only thing left out is the question-generation file that uses the built-in AI.

## Technical details
- New table `about_blocks` (type, content, image, order). Anyone can read it; changes go through server functions that check the admin password. Pictures are stored in a public storage bucket.
- New fields added to `progress`: `avatar` (gender, equipped items, unlocked items), `streak` (current, best, last day, daily tasks done) and `badges` (unlocked ids plus counters such as best right-answer run and star-saving days). They sync the same way progress already does.
- Gender is saved with the account at sign-up.
- A daily practice runs on the normal play page with a `?daily=1` flag, which switches on the yellow-star chance.
- Tutorial state is stored in settings (`tutorialDone`).
