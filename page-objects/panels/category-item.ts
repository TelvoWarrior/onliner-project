import { Selector } from "testcafe"
import { Button } from "../elements/button";

export class CategoryItem {
    
    static getMenuItem(item:string){
        return new Button (Selector(`span`).withText(item), `${item}`);
    }
}