import { Selector } from "testcafe"
import { Button } from "../elements/button";

export enum MainMenuEnum {
    CATALOGUE = `Каталог`,
    NEWS = `Новости`,
    AUTO = `Автобарахолка`,
    HOUSES_AND_APPARTEMENTS = `Дома и квартиры`,
    SERVICES = `Услуги`,
    FLEA_MARKET = `Барахолка`,
    FORUM = `Форум`,
}

export class MainMenu {
    private static _selectorHelper = Selector(`ul[class*="b-main-navigation"]`).find(`a[class="b-main-navigation__link"]`)

    static getMenuItem(item:MainMenuEnum){
        return new Button(MainMenu._selectorHelper.withText(item),`${item}`);
    }
}