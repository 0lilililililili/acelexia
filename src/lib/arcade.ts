export const ARCADE_GAMES = [
 {id:"character-builder",world:"fire",subject:"chi",name:"Restaurant Character Builder"},
 {id:"vocal-arena",world:"fire",subject:"chi",name:"1v1 Vocal Arena"},
 {id:"appraiser",world:"fire",subject:"chi",name:"Counterfeit Goods Appraiser"},
 {id:"typo-detective",world:"aquatic",subject:"eng",name:"Typo Scene Detective"},
 {id:"word-family",world:"aquatic",subject:"eng",name:"Word Family Linker"},
 {id:"basket",world:"forest",subject:"math",name:"Basket Collector"},
 {id:"bakery",world:"forest",subject:"math",name:"Bakery Problem Solver"},
];
export type ArcadeProps = {grade:string; lang:"zh-TW"|"zh-CN"|"en"; readingScaffold?:"off"|"light"|"full"; soundHelp?:boolean; onComplete:(correct:number,total:number)=>void};