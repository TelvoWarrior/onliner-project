import { Selector } from "testcafe"
import { Label } from "../elements/label";

enum CatalogueItemEnum {
    ELECTRONICS = `Электроника`,
    HOUSE_AND_GARDEN = `Дом и сад`,
    //...etc
}

export class CatalogueItem {
    public static readonly ELECTRONICS = new Label (Selector(`span`).withText(CatalogueItemEnum.ELECTRONICS), CatalogueItemEnum.ELECTRONICS);
    public static readonly HOUSE_AND_GARDEN = new Label (Selector(`span`).withText(CatalogueItemEnum.HOUSE_AND_GARDEN), CatalogueItemEnum.HOUSE_AND_GARDEN);
    //...etc
}