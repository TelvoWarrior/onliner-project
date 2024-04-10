import { Selector } from "testcafe"
import { Label } from "../elements/label";

export class MainMenu {
    private static readonly _selectorHelper = Selector(`ul[class*="b-main-navigation"]`).find(`a[class="b-main-navigation__link"]`)
    public static readonly CATALOGUE = new Label (this._selectorHelper.nth(0), `Catalogue`);
    //...etc
}