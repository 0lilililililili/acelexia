import { describe, expect, test } from "bun:test";
import { answerOutcome } from "./answer-outcome";

describe("first-attempt answer scoring", () => {
  test("the first incorrect MC press counts as wrong", () => {
    expect(answerOutcome("dog", "cat", ["dog", "cat"])).toBe("wrong");
  });
  test("an incorrect spoken MC choice counts as wrong", () => {
    expect(answerOutcome("letter A", "cat", ["dog", "cat"], true)).toBe("wrong");
  });
  test("a correct first MC choice counts as correct", () => {
    expect(answerOutcome("letter B", "cat", ["dog", "cat"], true)).toBe("correct");
  });
  test("incorrect non-MC answers still allow retry", () => {
    expect(answerOutcome("5", "4")).toBe("retry");
    expect(answerOutcome("4", "4")).toBe("correct");
  });
});