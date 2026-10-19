import { test } from "node:test";
import { strict as assert } from "node:assert";
import { arcadeStars } from "./arcade-rewards";

test("arcade awards one themed star at 50%", () => {
  assert.equal(arcadeStars(49, 100), 0);
  assert.equal(arcadeStars(50, 100), 1);
});
test("arcade awards two themed stars at 70%", () => {
  assert.equal(arcadeStars(69, 100), 1);
  assert.equal(arcadeStars(70, 100), 2);
});
test("arcade awards three themed stars at 90%", () => {
  assert.equal(arcadeStars(89, 100), 2);
  assert.equal(arcadeStars(90, 100), 3);
});
test("empty and zero-correct rounds award nothing", () => {
  assert.equal(arcadeStars(0, 0), 0);
  assert.equal(arcadeStars(0, 10), 0);
});