import { Selector } from "testcafe"
import { Button } from "../elements/button";
import { MainMenuEnum } from "../enums/menu-items-enum";

export class MainMenu {
    private static _selectorHelper = Selector(`ul[class*="b-main-navigation"]`).find(`a[class="b-main-navigation__link"]`)

    static getMenuItem(item:MainMenuEnum){
        return new Button(MainMenu._selectorHelper.withText(item),`${item}`);
    }
}