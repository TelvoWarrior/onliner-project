import { t } from "testcafe";
import { Checkbox } from "../elements/checkbox";
import { Label } from "../elements/label";
import { FormPanel } from "../panels/form-panel";

export class FormPanelStepsImpl {
    async click(item: Label | Checkbox) {
        await item.click();
    }

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
}

export const FormPanelSteps = new FormPanelStepsImpl();