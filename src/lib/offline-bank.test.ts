import { describe, it, expect } from "vitest";
import { offlineLevelItems } from "./offline-bank";
import { matchesSubject } from "./question-contract";

describe("offline tower bank", () => {
  for (const subject of ["chi", "eng", "math"])
    for (const grade of ["K3", "P1", "P3", "P6"])
      it(`gives 14 valid ${subject} ${grade} items`, () => {
        const items = offlineLevelItems({ subject, grade, level: 7, count: 14, language: "zh-TW" });
        expect(items.length).toBe(14);
        expect(items.every((i) => matchesSubject(i, subject))).toBe(true);
      });
});
