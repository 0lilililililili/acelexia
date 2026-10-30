import {test} from "node:test";
import {strict as assert} from "node:assert";
import { BASKET_SECONDS, PARALYSIS_SECONDS, basketGoods, builderRound, BUILDER_BANDS } from "./arcade-data";
test("basket has 200 seconds and wrong picks cause 3 seconds paralysis",()=>{assert.equal(BASKET_SECONDS,200);assert.equal(PARALYSIS_SECONDS,3)});
test("basket expression values agree with their labels",()=>{for(const g of basketGoods(8,1)){const [a,op,b]=g.text.split(" "); const value=op==="+"?Number(a)+Number(b):op==="−"?Number(a)-Number(b):op==="×"?Number(a)*Number(b):Number(a)/Number(b);assert.equal(value,g.value)}});
test("K3 characters use levels 1–3",()=>{for(let i=0;i<30;i++)assert.ok(builderRound("K3").every(c=>c.difficulty>=1&&c.difficulty<=3))});
test("P1 characters use levels 4–5",()=>{for(let i=0;i<30;i++)assert.ok(builderRound("P1").every(c=>c.difficulty>=4&&c.difficulty<=5))});
test("character rounds have an equal load within each grade",()=>{for(const [grade,band] of Object.entries(BUILDER_BANDS)){for(let i=0;i<30;i++){const round=builderRound(grade);assert.equal(round.reduce((s,c)=>s+c.difficulty,0),band.budget);assert.ok(round.every(c=>c.difficulty>=band.min&&c.difficulty<=band.max))}}});