import { Selector } from "testcafe";
import { Label } from "../elements/label";
import { Button } from "../elements/button";

export class CatalogueItem {
    private _itemSelector;
    private _itemTitle;
    private _itemParameters;
    private _reviewCountElement;
    private _price;
    private _offersButton;
    private _used;

    constructor(itemIndex: number) {
        this._itemSelector = Selector(`div[class*="catalog-form__offers-item_primary"]`)
            .filter((node) => !node.querySelector(`div[title="Товар с платным продвижением"]`)).nth(itemIndex);
        this._itemTitle = new Label(this._itemSelector.find(`a[class*="catalog-form__link_base-additional"]`), `Item Title`);
        this._itemParameters = new Label(this._itemSelector.find(`div.catalog-form__offers-part_data .catalog-form__parameter`), `Item Parameters Block`);
        this._reviewCountElement = new Label(this._itemSelector.find(`span[class="catalog-form__rating-count"]`), `Review count`);
        this._price = new Button(this._itemSelector.find(`a[href*="prices"][class*="catalog-form__link"]`), `Price`);
        this._offersButton = new Button(this._itemSelector.find(`a[class*="button"]`), `Offers`);
        this._used = new Label(this._itemSelector.find(`a[href*="used"]`), `Used`)
    }

    get itemTitle() {
        return this._itemTitle;
    }
    get itemParameters() {
        return this._itemParameters;
    }
    get reviewCount() {
        return this._reviewCountElement;
    }
    get price() {
        return this._price;
    }
    get offersButton() {
        return this._offersButton;
    }
    get used() {
        return this._used;
    }
}