import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { offlineLevelItems } from "./offline-bank";
import { matchesSubject } from "./question-contract";

describe("offline tower bank", () => {
  for (const subject of ["chi", "eng", "math"])
    for (const grade of ["K3", "P1", "P3", "P6"])
      it(`gives 14 valid ${subject} ${grade} items`, () => {
        const items = offlineLevelItems({ subject, grade, level: 7, count: 14, language: "zh-TW" });
        assert.equal(items.length, 14);
        assert.ok(items.every((i) => matchesSubject(i, subject)));
      });
});

import { test as t2, expect as e2 } from "bun:test";
import { offlineLevelItems as oli } from "./offline-bank";
t2("Chinese reading items are never a single character", () => {
  for (const grade of ["K3","P1","P3","P6"] as const) {
    const items = oli({ subject: "chi", grade, level: 1, count: 200, language: "zh-TW" } as any);
    for (const it of items.filter((i) => !i.choices?.length)) e2([...it.prompt].length).toBeGreaterThanOrEqual(2);
  }
});
