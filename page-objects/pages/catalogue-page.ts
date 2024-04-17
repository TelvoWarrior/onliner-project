import { Selector } from "testcafe";
import { Label } from "../elements/label";
import { Button } from "../elements/button";

export class CataloguePage {
    private _pageTitleLabel = new Label(Selector(`H1`), `Page Title`);
    private _popUpAcceptButton = new Button(Selector(`div[class="popover-style__container"]`).find(`a,span[class*=button]`).filterVisible(), `Accept`);
    private _catalogueItemSelector = Selector(`div[class*="catalog-form__offers-item_primary"]`)
        .filter((node) => !node.querySelector(`div[title="Товар с платным продвижением"]`));

    get pageTitleText() {
        return this._pageTitleLabel.innerText;
    }

    get catalogueItemSelector() {
        return this._catalogueItemSelector;
    }

    get acceptButton() {
        return this._popUpAcceptButton;
    }
}