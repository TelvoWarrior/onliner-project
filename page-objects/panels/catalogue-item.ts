import { Label } from "../elements/label";
import { Button } from "../elements/button";
import { CataloguePage } from "../pages/catalogue-page";

export class CatalogueItem {
    private _itemTitleLabel:Label;
    private _itemParametersLabel:Label;
    private _reviewCountElementLabel:Label;
    private _priceButton:Button;
    private _offersButton:Button;
    private _usedLabel:Label;

    constructor(itemIndex: number) {
        var pageObj = new CataloguePage();
        var itemSelector = pageObj.catalogueItemSelector.nth(itemIndex);
        
        this._itemTitleLabel = new Label(itemSelector.find(`a[class*="catalog-form__link_base-additional"]`), `Item Title`);
        this._itemParametersLabel = new Label(itemSelector.find(`div.catalog-form__offers-part_data .catalog-form__parameter`), `Item Parameters Block`);
        this._reviewCountElementLabel = new Label(itemSelector.find(`span[class="catalog-form__rating-count"]`), `Review count`);
        this._priceButton = new Button(itemSelector.find(`a[href*="prices"][class*="catalog-form__link"]`), `Price`);
        this._offersButton = new Button(itemSelector.find(`a[class*="button"]`), `Offers`);
        this._usedLabel = new Label(itemSelector.find(`a[href*="used"]`), `Used`);
    }

    get itemTitleLabel() {
        return this._itemTitleLabel;
    }
    get itemParametersLabel() {
        return this._itemParametersLabel;
    }
    get reviewCountLabel() {
        return this._reviewCountElementLabel;
    }
    get priceButton() {
        return this._priceButton;
    }
    get offersButton() {
        return this._offersButton;
    }
    get usedLabel() {
        return this._usedLabel;
    }

}