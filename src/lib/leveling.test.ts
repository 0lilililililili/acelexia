import { describe, expect, it } from "vitest";
import { expForLv, playerLv } from "./leveling";

describe("leveling curve", () => {
  it("early levels need less EXP than later ones", () => {
    expect(expForLv(1)).toBe(50);
    expect(expForLv(10)).toBe(140);
  });
  it("50 EXP reaches LV2, 110 reaches LV3", () => {
    expect(playerLv(49)).toBe(1);
    expect(playerLv(50)).toBe(2);
    expect(playerLv(110)).toBe(3);
  });
});
