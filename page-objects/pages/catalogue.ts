import { Selector } from "testcafe";
import { Label } from "../elements/label";

export class Catalogue {
    public static readonly TITLE = new Label(Selector(`H1`), `Заголовок`)
    public static readonly ITEM = Selector(`div[class*="catalog-form__offers-item_primary"]`)
        .filter((node) => {
            const childDivWithTitle = node.querySelector(`div[title="Товар с платным продвижением"]`);
            return !childDivWithTitle;
        });

    static getItem(nth:number) {
        return this.ITEM.nth(nth);
    }
    static getItemsCount(){
        return this.ITEM.count
    }
}