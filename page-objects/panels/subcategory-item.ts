import { Selector } from "testcafe";
import { Label } from "../elements/label";

enum SubCategoryEnum {
    HEADPHONES = `Наушники`,
    TRIMMERS = `Триммеры`,
    //...etc
}

export class SubCategoryItem {
    private static readonly _selectorHelper = Selector(`span[class="catalog-navigation-list__dropdown-title"]`);
    public static readonly HEADPHONES = new Label(this._selectorHelper.withText(SubCategoryEnum.HEADPHONES), SubCategoryEnum.HEADPHONES);
    public static readonly TRIMMERS = new Label(this._selectorHelper.withText(SubCategoryEnum.TRIMMERS), SubCategoryEnum.TRIMMERS);
    //...etc
}