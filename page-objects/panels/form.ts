import { Selector} from "testcafe";
import { BonusBlockItemEnum } from "../enums/form-enum";

export class Form {
    public static readonly FORM_BONUS_BLOCK_SELECTOR = Selector(`div.catalog-form__bonus-list`);
    public static readonly FORM_BLOCK_SELECTOR = Selector(`div[class*="catalog-form__group"]`);
    public static readonly FORM_BLOCK_TITLE_SELECTOR = Selector(`.catalog-form__label-title`);

    static getFormBonusBlockItemSelector(item: BonusBlockItemEnum) {
        return this.FORM_BONUS_BLOCK_SELECTOR.find(`label[class*="${item}"]`)
    }

    static getFormBlockSelectorByItsIndex(index: number) {
        return this.FORM_BLOCK_SELECTOR.nth(index);
    }

    static getFormBlockSelectorByItsTitle(title: string) {
        return this.getFormBlockTitleSelector(title).parent(`div[class*="catalog-form__group"]`);
    }

    static getFormBlockTitleSelector(title: string) {
        return this.FORM_BLOCK_TITLE_SELECTOR.withText(title);
    }

}