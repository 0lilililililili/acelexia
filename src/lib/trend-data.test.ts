import { test } from "node:test";
import { strict as assert } from "node:assert";
import { trendRows, SUBJECT_COLORS } from "./trend-data";
test("subject totals do not double-count topic observations", () => {
 const data = { "math|2026-10-19": {c:1,t:2,ms:6000}, "math|2026-10-19|addition": {c:1,t:1,ms:2000} };
 assert.equal(trendRows(data).rows[0]["math:accuracy"], 50);
 assert.equal(trendRows(data).rows[0]["math:latency"], 3);
 assert.equal(trendRows(data,"math").rows[0]["addition:accuracy"],100);
 assert.equal(trendRows(data,"math").rows[0]["addition:latency"],2);
 assert.deepEqual(Object.keys(SUBJECT_COLORS),["chi","eng","math"]);
});