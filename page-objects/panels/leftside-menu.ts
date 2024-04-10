import { Selector } from "testcafe";
import { Label } from "../elements/label";

enum LeftSideMenuEnum {
    AUDIO = `Аудиотехника`,
    GARDEN_TOOLS = `Садовая техника и инструменты`,
    //...etc
}

export class LeftSideMenu {
    private static readonly _selectorHelper = Selector(`div[class="catalog-navigation-list__aside-title"]`);
    public static readonly AUDIO = new Label(this._selectorHelper.withText(LeftSideMenuEnum.AUDIO), LeftSideMenuEnum.AUDIO);
    public static readonly GARDEN_TOOLS = new Label(this._selectorHelper.withText(LeftSideMenuEnum.GARDEN_TOOLS), LeftSideMenuEnum.GARDEN_TOOLS);
    //...etc
}