import { Selector, t } from "testcafe";
import { Form } from "../panels/form";
import { BonusBlockItemEnum } from "../enums/form-enum";
import { Checkbox } from "../elements/checkbox";

export class FormStepsImpl {

    private getFormBlockItemSelectorByBlockTitle(title: string) {
        return Form.getFormBlockSelectorByItsTitle(title).find(`ul.catalog-form__checkbox-list`).find(`li`);
    }

    private getFormBlockTextFieldSelectorByBlockTitle(title: string) {
        return Form.getFormBlockSelectorByItsTitle(title).find(`input[class*="catalog-form__input"]`);
    }

    private getCheckboxByItsTitle(title: string) {
        return new Checkbox(Selector(`label[class*="catalog-form"]`).withText(title).find(`div.i-checkbox__faux`), title)
    }

    async getFormBlockItemsList(title: string) {
        const itemsCount = await this.getFormBlockItemSelectorByBlockTitle(title).count;
        const itemsList: string[] = [];
        for (let i = 0; i < itemsCount; i++) {
            let currentItemInnerText = await this.getFormBlockItemSelectorByBlockTitle(title).nth(i).innerText;
            itemsList.push(currentItemInnerText);
        }
        return itemsList;
    }

    async getListOfFormBlocksTitle() {
        const titlesCount = await Form.FORM_BLOCK_TITLE_SELECTOR.count;
        const titlesList: string[] = [];
        for (let i = 0; i < titlesCount; i++) {
            titlesList.push(await Form.FORM_BLOCK_TITLE_SELECTOR.innerText);
        }
        return titlesList;
    }

    async checkFormBlockTitleExists(title: string) {
        await t.expect(await Form.getFormBlockTitleSelector(title).exists).ok(`Check form block title: ${title} exists`);
    }

    async checkFormBlockExists(title:string) {
        await t.expect(await Form.getFormBlockSelectorByItsTitle(title).exists).ok(`Check ${title} form block exists`);
    }

    async checkFormBlockItemExists(title: string) {
        await t.expect(await this.getFormBlockItemSelectorByBlockTitle(title).exists).ok(`Check ${title} form block has items in it`);
    }

    async checkFormBlockTextFieldExists(title: string) {
        await t.expect(await this.getFormBlockTextFieldSelectorByBlockTitle(title).exists).ok(`Check ${title} form block has items in it`);
    }

    async checkFormBonusBlockItemExists(item: BonusBlockItemEnum) {
        await t.expect(await Form.getFormBonusBlockItemSelector(item).exists).ok(`Check form bonus block item ${item} exists`);
    }

    async checkCheckboxExists(title: BonusBlockItemEnum | string) {
        const checkbox = Object.values(BonusBlockItemEnum).includes(title as BonusBlockItemEnum) ? 
            new Checkbox(Form.getFormBonusBlockItemSelector(title as BonusBlockItemEnum).find(`div[class*="faux"]`), `${await Form.getFormBonusBlockItemSelector(title as BonusBlockItemEnum).innerText}`) : 
            this.getCheckboxByItsTitle(title);
        await t.expect(await checkbox.exists).ok(`Check ${title} checkbox exists`);
    }
}

export const FormSteps = new FormStepsImpl();