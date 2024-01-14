import { SubItem } from "./SubItem";

export interface Item {
    id:string;
    label:string;
    link:string ;
    subItems:SubItem[] ;
    active:boolean ;
    parentId?: number;
 }