import {test} from "node:test";
import {strict as assert} from "node:assert";
import {BUILD_CHARACTERS} from "./arcade-data";
import {characterLayout,validCharacterLayout} from "./character-layout";
test("贏 has 亡 and 口 in full upper rows, 月 貝 凡 in three bottom columns",()=>{
 const q=characterLayout("贏");
 assert.deepEqual(q,{rows:3,cols:3,parts:[
  {text:"亡",row:1,col:1,rowSpan:1,colSpan:3},
  {text:"口",row:2,col:1,rowSpan:1,colSpan:3},
  {text:"月",row:3,col:1,rowSpan:1,colSpan:1},
  {text:"貝",row:3,col:2,rowSpan:1,colSpan:1},
  {text:"凡",row:3,col:3,rowSpan:1,colSpan:1},
 ]});
});
test("every assembly answer matches its reviewed basic parts and valid positions",()=>{
 for(const q of BUILD_CHARACTERS){const layout=characterLayout(q.word);assert.ok(validCharacterLayout(layout),q.word);assert.deepEqual(q.parts,layout.parts.map(p=>p.text),q.word);assert.ok(q.distractors.every(p=>!q.parts.includes(p)),q.word)}
});
test("structure validator rejects overlapping or missing positions",()=>{
 assert.equal(validCharacterLayout({rows:1,cols:2,parts:[{text:"木",row:1,col:1,rowSpan:1,colSpan:1}]}),false);
 assert.equal(validCharacterLayout({rows:1,cols:1,parts:[{text:"木",row:1,col:1,rowSpan:1,colSpan:1},{text:"木",row:1,col:1,rowSpan:1,colSpan:1}]}),false);
 assert.throws(()=>characterLayout("不存在"));
});
test("complex nested characters keep upper and lower positions",()=>{
 assert.deepEqual(characterLayout("鬱").parts.map(p=>[p.text,p.row,p.col]),[["木",1,1],["缶",1,2],["木",1,3],["冖",2,1],["鬯",3,1],["彡",3,3]]);
 assert.deepEqual(characterLayout("語").parts.map(p=>[p.text,p.row,p.col,p.rowSpan]),[["言",1,1,2],["五",1,2,1],["口",2,2,1]]);
});