import {CHARACTER_LAYOUTS, type CharacterLayout} from "./character-layout-data";
export function characterLayout(word:string):CharacterLayout {
 const layout=CHARACTER_LAYOUTS[word];
 if(!layout)throw new Error(`Character has no reviewed structure: ${word}`);
 return layout;
}
// Compatibility for existing callers; gameplay uses positions, never shape guesses.
export function characterShape(word:string) {
 const q=characterLayout(word);
 if(["森","鑫","轟","晶","品","淼","焱","磊","龘"].includes(word))return "triple";
 return q.rows===1?"left-right":q.cols===1?"top-bottom":"positioned";
}
export function validCharacterLayout(layout:CharacterLayout) {
 if(!Number.isInteger(layout.rows)||!Number.isInteger(layout.cols)||layout.rows<1||layout.cols<1)return false;
 const cells=new Set<string>();
 for(const p of layout.parts){
  if([...p.text].length!==1||![p.row,p.col,p.rowSpan,p.colSpan].every(n=>Number.isInteger(n)&&n>0)||p.row+p.rowSpan-1>layout.rows||p.col+p.colSpan-1>layout.cols)return false;
  for(let r=p.row;r<p.row+p.rowSpan;r++)for(let c=p.col;c<p.col+p.colSpan;c++){
   const key=`${r}:${c}`;if(cells.has(key))return false;cells.add(key);
  }
 }
 return cells.size===layout.rows*layout.cols;
}