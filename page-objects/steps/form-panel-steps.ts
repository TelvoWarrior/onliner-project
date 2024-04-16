import { t } from "testcafe";
import { FormPanel } from "../panels/form-panel";

export class FormPanelStepsImpl {

    async checkFormTitleExists(title: string | number) {
        await t.expect(FormPanel.getFormTitle(title).exists).ok(`Check if form title ${title} is visible`);
    }

    async checkFormHasCheckbox(title: string, checkbox: string | number) {
        await t.expect(await FormPanel.getFormCheckbox(title, checkbox).exists).ok(`Check ${title} form has ${checkbox} checkbox`);
    }

    async checkCheckboxExists(checkbox: string) {
        await t.expect(await FormPanel.getCheckboxByName(checkbox).exists).ok(`Check ${checkbox} exists`);
    }

    async checkFormHasTextfield(title: string, textfield: number = 0) {
        await t.expect(await FormPanel.getFormTextfield(title, textfield).exists).ok(`Check ${title} form has ${textfield} textfield`);
    }

    async checkSuperCheckboxExists(nth:number) {
        await t.expect(await FormPanel.getSuperCheckbox(nth).exists).ok(`Check ${nth}'th super checkbox exists`);
    }

    async getFormItemList(title:string) {
        const itemSelector = FormPanel.FORM_TITLE_SELECTOR.withText(title).parent(`div[class*="catalog-form__group"]`).find(`li[class*="catalog-form__checkbox-item"]`);
        const itemCount = await itemSelector.count;
        const itemList = [];
        for (let i = 0; i < itemCount; i++) {
            itemList.push(await itemSelector.nth(i).innerText);
        }
        return itemList;
    }
}

export const FormPanelSteps = new FormPanelStepsImpl();