import {AvatarFigure} from "@/components/avatar-figure";
import {resolveLook,byId} from "@/lib/avatar";
import {emptyAvatar} from "@/lib/store";
export function FamilyNpc({mother=false}:{mother?:boolean}){
 const look=resolveLook(emptyAvatar(mother?"girl":"boy"));
 const shirt=byId(mother?"shirt.ranger":"shirt.red");if(shirt)look.shirt=shirt;
 const hair=byId(mother?"hair.ponytail":"hair.short");if(hair)look.hair=hair;
 return <span className="family-npc shrink-0" aria-label={mother?"Mother":"Child"}><AvatarFigure look={look} gender={mother?"girl":"boy"} size={mother?62:46}/></span>;
}