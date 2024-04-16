import { Selector } from "testcafe";
import { Label } from "../elements/label";

export class CataloguePage {
    public static readonly TITLE = new Label(Selector(`H1`), `Заголовок`)
    private static readonly ITEM = Selector(`div[class*="catalog-form__offers-item_primary"]`)
        .filter((node) => !node.querySelector(`div[title="Товар с платным продвижением"]`));

    static getItemsCount(){
        return this.ITEM.count;
    }
}