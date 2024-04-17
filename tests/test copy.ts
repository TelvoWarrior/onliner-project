import { t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenu } from "../page-objects/panels/main-menu";
import { CategoryItem } from "../page-objects/panels/category-item";
import { CatalogueSteps } from "../page-objects/steps/catalogue-steps";
import { CategoryMenuEnum, LeftSideMenuEnum, MainMenuEnum, SubCategoryMenuEnum } from "../page-objects/enums/menu-items-enum";
import { FormSteps } from "../page-objects/steps/form-steps";
import { BonusBlockItemEnum, CommonFormBlockTitlesEnum, CommonFormItemsEnum } from "../page-objects/enums/form-enum";

fixture(`Onliner Project`)
    .page(TEST_URL);

test(`Onliner test`, async () => {
    await t.maximizeWindow();
    await t.setNativeDialogHandler(() => true);

    Logger.step(1, `Headphones catalogue check`)
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.ELECTRONICS).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.AUDIO).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.HEADPHONES).click();
    await CatalogueSteps.checkPageTitleContainsString(SubCategoryMenuEnum.HEADPHONES);
    await CatalogueSteps.checkGoodsAmountGreaterThan(5);
    await CatalogueSteps.closePopups();
    await FormSteps.checkFormBlockTitleExists(CommonFormBlockTitlesEnum.PRICE);
    await FormSteps.checkFormBlockTitleExists(CommonFormBlockTitlesEnum.MANUFACTURER);
    await FormSteps.checkFormBlockTitleExists(CommonFormBlockTitlesEnum.STORES);
    await FormSteps.checkFormBlockTextFieldExists(CommonFormBlockTitlesEnum.PRICE);
    await FormSteps.checkFormBlockItemExists(CommonFormBlockTitlesEnum.MANUFACTURER);
    await FormSteps.checkFormBlockItemExists(CommonFormBlockTitlesEnum.STORES);
    await t.debug();
    await FormSteps.checkCheckboxExists(BonusBlockItemEnum.PRIME);
    await FormSteps.checkCheckboxExists(BonusBlockItemEnum.HOT_PRICE);
    await FormSteps.checkCheckboxExists(CommonFormItemsEnum.NATIONWIDE_SHIPPING);

    await t.debug();
})