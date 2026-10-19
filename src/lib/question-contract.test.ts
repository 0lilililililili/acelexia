import { test } from "node:test";
import { strict as assert } from "node:assert";
import { matchesSubject, fallbackItems } from "./question-contract";
test("math rejects English spelling MC",()=>assert.equal(matchesSubject({prompt:"Which spelling is correct?",answer:"because",choices:["because","becuase","becasue","bacause"],topic:"spelling"},"math"),false));
test("each subject accepts its own fallback and rejects others",()=>{
 for(const subject of ["chi","eng","math"]) for(const item of fallbackItems(subject,8)) assert.equal(matchesSubject(item,subject),true);
 assert.equal(matchesSubject({prompt:"2 + 4",answer:"6"},"eng"),false);
 assert.equal(matchesSubject({prompt:"cat",answer:"cat"},"chi"),false);
});