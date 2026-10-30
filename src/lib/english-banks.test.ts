import {test} from "node:test";
import {strict as assert} from "node:assert";
import {ENGLISH_BANKS} from "./english-banks";
import {GRADES,GradeBankSchema,validTypos} from "./arcade-bank-schema";
test("each school grade has at least 50 valid unique spelling questions",()=>{for(const grade of GRADES){const bank=ENGLISH_BANKS[grade];assert.ok(bank,grade);assert.ok(bank.typos.length>=50,grade);assert.ok(validTypos(bank.typos),grade);assert.ok(GradeBankSchema.safeParse(bank).success,grade)}});
test("each school grade has 50 distinct real family roots to start",()=>{for(const grade of GRADES){assert.equal(new Set(ENGLISH_BANKS[grade].families.map(q=>q.child)).size,50,grade)}});