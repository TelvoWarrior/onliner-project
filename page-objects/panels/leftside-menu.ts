import { Selector } from "testcafe";
import { Button } from "../elements/button";

export class LeftSideMenu {
    private static readonly _selectorHelper = Selector(`div[class="catalog-navigation-list__aside-title"]`);
    
    static getMenuItem(item:string){
        return new Button(LeftSideMenu._selectorHelper.withText(item),`${item}`);
    }
}