import { Item } from "./Item";

export interface MenuItem {
     id:string  ;
     label:string ;
     icon:string ;
     link:string ;
     subItems:Item[] ;
     active:boolean ;
     title:boolean;
  }