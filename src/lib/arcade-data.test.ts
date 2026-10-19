import {test} from "node:test";
import {strict as assert} from "node:assert";
import { BASKET_SECONDS, PARALYSIS_SECONDS, basketGoods, builderRound } from "./arcade-data";
test("basket has 200 seconds and wrong picks cause 3 seconds paralysis",()=>{assert.equal(BASKET_SECONDS,200);assert.equal(PARALYSIS_SECONDS,3)});
test("basket expression values agree with their labels",()=>{for(const g of basketGoods(8,1)){const [a,op,b]=g.text.split(" "); const value=op==="+"?Number(a)+Number(b):op==="−"?Number(a)-Number(b):Number(a)/Number(b);assert.equal(value,g.value)}});
test("character complexity load stays balanced with grade",()=>{for(const grade of ["K3","P1","P6"]){const load=builderRound(grade).reduce((s,c)=>s+c.difficulty,0);assert.ok(load>=8&&load<=10)}assert.ok(builderRound("K3").every(c=>c.difficulty===1))});