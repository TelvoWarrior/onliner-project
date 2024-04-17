import { Selector } from "testcafe"
import { Button } from "../elements/button";

export class CategoryItem {
    private static readonly _leftSideSelectorHelper = Selector(`div[class="catalog-navigation-list__aside-title"]`);
    private static readonly _subCategorySelectorHelper = Selector(`span[class="catalog-navigation-list__dropdown-title"]`);
   
    static getCategoryItem(item:string){
        return new Button (Selector(`span`).withText(item), `${item}`);
    }

    static getLeftSideItem(item:string){
        return new Button(CategoryItem._leftSideSelectorHelper.withText(item),`${item}`);
    }

    static getSubCategoryItem(item:string){
        return new Button(CategoryItem._subCategorySelectorHelper.withText(item),`${item}`);
    }

}