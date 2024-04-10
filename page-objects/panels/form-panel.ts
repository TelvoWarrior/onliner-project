import { Selector } from "testcafe";
import { Label } from "../elements/label";
import { Checkbox } from "../elements/checkbox";

export class FormPanel {
    private static readonly FORM_TITLE_SELECTOR = Selector(`div[class*="catalog-form__label-title"]`);
    private static readonly CHECKBOX_SELECTOR = Selector(`div[class="catalog-form__checkbox-sign"]`);
    private static readonly SUPER_CHECKBOX = Selector(`div[class="catalog-form__bonus-list"]`).find(`label`).find(`div[class*="faux"]`);

    static getFormTitle(title: string | number) {
        return typeof title === `string` ?
            new Label(FormPanel.FORM_TITLE_SELECTOR.withText(`${title}`), `${title}`) :
            new Label(FormPanel.FORM_TITLE_SELECTOR.nth(title), `${title}'th form title`);
    }

    static getFormCheckbox(form: string, checkbox: string | number) {
        return typeof checkbox === `string` ?
            new Checkbox(FormPanel.FORM_TITLE_SELECTOR.withText(`${form}`).parent(3).find(`li[class*="checkbox-item"]`).withText(checkbox).find(`div[class="i-checkbox__faux"]`), `${checkbox}`) :
            new Checkbox(FormPanel.FORM_TITLE_SELECTOR.withText(`${form}`).parent(3).find(`li[class*="checkbox-item"]`).nth(checkbox).find(`div[class="i-checkbox__faux"]`), `${checkbox}'th checkbox`);
    }

    static getFormTextfield(form: string, textfield: number) {
        return new Label(FormPanel.FORM_TITLE_SELECTOR.withText(`${form}`).parent(2).nextSibling(0).find('input').nth(textfield), `${textfield} textfield`);
    }

    static getCheckboxByName(name: string) {
        return new Checkbox(this.CHECKBOX_SELECTOR.withText(name).parent(0).prevSibling(1), `${name}`);
    }

    static getSuperCheckbox(nth: number) {
        return new Checkbox(this.SUPER_CHECKBOX.nth(nth), `${nth+1}'(st/nd/rd) super checkbox`);
    }
}