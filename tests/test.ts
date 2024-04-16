import { t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenu } from "../page-objects/panels/main-menu";
import { CategoryItem } from "../page-objects/panels/category-item";
import { CatalogueSteps } from "../page-objects/steps/catalogue-steps";
import { FormPanelSteps } from "../page-objects/steps/form-panel-steps";
import { CategoryMenuEnum, LeftSideMenuEnum, MainMenuEnum, SubCategoryMenuEnum } from "../page-objects/enums/menu-items-enum";
import { FormTitleEnum } from "../page-objects/enums/form-title-enum";

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
    
    for (let i = 0; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueSteps.checkItemTitleContainsString(SubCategoryMenuEnum.HEADPHONES, item);
        await CatalogueSteps.checkItemDescriptionContainsString(SubCategoryMenuEnum.HEADPHONES, item);
        await CatalogueSteps.checkItemHasReview(i, item);
        await CatalogueSteps.checkItemHasOffer(i, item);
    }

    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.PRICE);
    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.MANUFACTURER);
    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.STORES);
    await FormPanelSteps.checkFormHasTextfield(FormTitleEnum.PRICE, 0);
    await FormPanelSteps.checkFormHasTextfield(FormTitleEnum.PRICE, 1);
    await FormPanelSteps.checkFormHasCheckbox(FormTitleEnum.MANUFACTURER, 0);
    await FormPanelSteps.checkFormHasCheckbox(FormTitleEnum.STORES, 0);
    await FormPanelSteps.checkCheckboxExists(FormTitleEnum.IN_STOCK);
    await FormPanelSteps.checkSuperCheckboxExists(2);
    await FormPanelSteps.checkCheckboxExists(FormTitleEnum.NATIONWIDE_SHIPPING);
    await CatalogueSteps.findUsedOfferAndCheckItsLowerThanNewOne();
    
    Logger.step(2, `Trimmers catalogue check`)
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.HOUSE_AND_GARDEN).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.GARDEN_TOOLS).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.TRIMMERS).click();

    await CatalogueSteps.checkPageTitleContainsString(SubCategoryMenuEnum.TRIMMERS);
    await CatalogueSteps.checkGoodsAmountGreaterThan(5);
    
    for (let i = 0; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueSteps.checkItemTitleContainsString(SubCategoryMenuEnum.TRIMMERS, item);
        // await CatalogueSteps.checkItemDescriptionContainsString(`Триммер`, i);
        await CatalogueSteps.checkItemHasReview(i, item);
        await CatalogueSteps.checkItemHasOffer(i, item);
    }
    
    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.PRICE);
    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.MANUFACTURER);
    await FormPanelSteps.checkFormTitleExists(FormTitleEnum.STORES);
    await FormPanelSteps.checkFormHasTextfield(FormTitleEnum.PRICE, 0);
    await FormPanelSteps.checkFormHasTextfield(FormTitleEnum.PRICE, 1);
    await FormPanelSteps.checkFormHasCheckbox(FormTitleEnum.MANUFACTURER, 0);
    await FormPanelSteps.checkFormHasCheckbox(FormTitleEnum.STORES, 0);
    await FormPanelSteps.checkCheckboxExists(FormTitleEnum.IN_STOCK);
    await FormPanelSteps.checkSuperCheckboxExists(2);
    await FormPanelSteps.checkCheckboxExists(FormTitleEnum.NATIONWIDE_SHIPPING);
    await CatalogueSteps.findUsedOfferAndCheckItsLowerThanNewOne();

    await t.debug();

})