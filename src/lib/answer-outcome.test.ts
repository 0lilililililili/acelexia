import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { answerOutcome } from "./answer-outcome";

describe("first-attempt answer scoring", () => {
  test("the first incorrect MC press counts as wrong", () => {
    assert.equal(answerOutcome("dog", "cat", ["dog", "cat"]), "wrong");
  });
  test("an incorrect spoken MC choice counts as wrong", () => {
    assert.equal(answerOutcome("letter A", "cat", ["dog", "cat"], true), "wrong");
  });
  test("a correct first MC choice counts as correct", () => {
    assert.equal(answerOutcome("letter B", "cat", ["dog", "cat"], true), "correct");
  });
  test("incorrect non-MC answers still allow retry", () => {
    assert.equal(answerOutcome("5", "4"), "retry");
    assert.equal(answerOutcome("4", "4"), "correct");
  });
});