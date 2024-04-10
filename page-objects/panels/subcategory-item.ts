import { Selector } from "testcafe";
import { Button } from "../elements/button";

export class SubCategoryItem {
    private static readonly _selectorHelper = Selector(`span[class="catalog-navigation-list__dropdown-title"]`);
    
    static getMenuItem(item:string){
        return new Button(SubCategoryItem._selectorHelper.withText(item),`${item}`);
    }
}