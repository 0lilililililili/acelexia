import { test } from "node:test";
import assert from "node:assert/strict";
import { explain } from "./explanations.ts";

for (const subject of ["math", "chi", "eng"]) {
  test(`explain gives reasons and a tip for ${subject}`, () => {
    const e = explain({ subject, prompt: subject === "math" ? "12 + 7 = ?" : "Pick the word", answer: subject === "math" ? "19" : "bed", chosen: "deb" });
    assert.ok(e.why.length > 0);
    assert.ok(e.tip.length > 0);
  });
}
