import { CatalogueItem } from "../panels/catalogue-item";
import { CatalogueItemSteps } from "../steps/catalogue-item-steps";

export class CatalogueItemValue {
    private _price:Promise<number>;
    private _description:Promise<string>;
    private _name:Promise<string>;

    constructor(item: CatalogueItem) {
        this._price = CatalogueItemSteps.getItemPrice(item);
        this._description = CatalogueItemSteps.getItemParameters(item);
        this._name = CatalogueItemSteps.getItemTitle(item);
    }

    get priceValuePromise() {
        return this._price;
    }

    get descriptionValuePromise() {
        return this._description;
    }

    get nameValuePromise() {
        return this._name;
    }
}