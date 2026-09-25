import type { AboutBlock } from "./about.functions";

/** Shown until an admin saves their own About page. */
export const DEFAULT_ABOUT: AboutBlock[] = [
  { kind: "heading", content: "About Acelexia" },
  {
    kind: "text",
    content:
      "Acelexia is a voice-first adventure game that helps dyslexic children in Hong Kong (K3 to P6) practise 中, ENG and MATH. Players defeat bosses by reading words out loud, collect stars, and build their own adventurer.",
  },
  { kind: "heading", content: "Data & privacy" },
  { kind: "heading", content: "1. Collected for the game" },
  {
    kind: "text",
    content:
      "• Username and a scrambled (hashed + salted) password — we never store the real password.\n• Grade, avatar gender (only used to choose the avatar body), avatar items.\n• Tower progress, stars, items, EXP, revision bank, daily streak and badges.\n• Settings: text size, time limit, language.",
  },
  { kind: "heading", content: "2. Research input data" },
  {
    kind: "text",
    content:
      "• The Input Data page records answers, correct/incorrect and time taken, with a random data ID.\n• No name or account is attached. Only the admin can view it.",
  },
  { kind: "heading", content: "3. Collected by the hosting platform (Lovable)" },
  {
    kind: "text",
    content:
      "• Basic hosting logs (such as request times and errors) kept by the platform to run the website.\n• Question generation sends only the grade, subject and level — never the child's name or answers.",
  },
  { kind: "heading", content: "4. Cache & on-device data" },
  {
    kind: "text",
    content:
      "• Login session, settings and progress copy are kept in the browser so the game works offline.\n• Game graphics are downloaded and cached for offline play.\n• Pressing Log out in Settings clears the session on this device.",
  },
  { kind: "heading", content: "5. Speech" },
  {
    kind: "text",
    content: "• Speech is turned into text by the browser's built-in speech service. Acelexia never records or saves audio.",
  },
  { kind: "heading", content: "6. Security measures" },
  {
    kind: "text",
    content:
      "• Account and progress tables are locked; only the game server can read or write them.\n• Admin tools need the admin password.\n• Input is checked on both the device and the server.",
  },
];
