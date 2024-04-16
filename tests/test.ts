import { t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenu } from "../page-objects/panels/main-menu";
import { CategoryItem } from "../page-objects/panels/category-item";
import { CatalogueSteps } from "../page-objects/steps/catalogue-steps";
import { FormPanelSteps } from "../page-objects/steps/form-panel-steps";
import { CategoryMenuEnum, LeftSideMenuEnum, MainMenuEnum, SubCategoryMenuEnum } from "../page-objects/enums/menu-items-enum";
import { FormTitleEnum } from "../page-objects/enums/form-title-enum";
import { CatalogueItemSteps } from "../page-objects/steps/catalogue-item-steps";
import { CatalogueItemValue } from "../page-objects/entities/catalogue-item-value";
import { FormPanel } from "../page-objects/panels/form-panel";

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
    
    for (let i = 0; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueItemSteps.checkItemTitleContainsString(SubCategoryMenuEnum.HEADPHONES, item);
        await CatalogueItemSteps.checkItemDescriptionContainsString(SubCategoryMenuEnum.HEADPHONES, item);
        await CatalogueItemSteps.checkItemHasReview(1, item);
        await CatalogueItemSteps.checkItemHasOffer(1, item);
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
    await CatalogueSteps.closePopups();

    await CatalogueSteps.checkPageTitleContainsString(SubCategoryMenuEnum.TRIMMERS);
    await CatalogueSteps.checkGoodsAmountGreaterThan(5);
    
    for (let i = 3; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueItemSteps.checkItemTitleContainsString(`Триммер`, item);
        // await CatalogueItemSteps.checkItemDescriptionContainsString(`Триммер`, i);
        await CatalogueItemSteps.checkItemHasReview(1, item);
        await CatalogueItemSteps.checkItemHasOffer(1, item);
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

    Logger.step(3, `Get first item from 'Headphones' catalogue and first item from 'Trimmers' catalogue. Check they're different`);
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.ELECTRONICS).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.AUDIO).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.HEADPHONES).click();
    const headphone = new CatalogueItemValue(await CatalogueSteps.getItem(0));
    
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.HOUSE_AND_GARDEN).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.GARDEN_TOOLS).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.TRIMMERS).click();
    const trimmer = new CatalogueItemValue(await CatalogueSteps.getItem(0));

    await CatalogueSteps.checkItemsAreDifferent(headphone, trimmer);

    Logger.step(4, `Get form title lists from 'Headphones' and 'Trimmers' catalogues. Check they're different`);
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.ELECTRONICS).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.AUDIO).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.HEADPHONES).click();
    const headphoneFormTitleList = await FormPanel.getFormTitleList();
    
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.HOUSE_AND_GARDEN).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.GARDEN_TOOLS).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.TRIMMERS).click();
    const trimmerFormTitleList = await FormPanel.getFormTitleList();

    await CatalogueSteps.checkFormListsAreDifferent(headphoneFormTitleList, trimmerFormTitleList);

    Logger.step(5, `Get manufacturers and shops from 'Headphones' and 'Trimmers' catalogues. Check they're different`)
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.ELECTRONICS).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.AUDIO).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.HEADPHONES).click();
    const headphonesStores = await FormPanelSteps.getFormItemList(FormTitleEnum.STORES);

    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.HOUSE_AND_GARDEN).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.GARDEN_TOOLS).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.TRIMMERS).click();
    const trimmersStores = await FormPanelSteps.getFormItemList(FormTitleEnum.STORES);

    await CatalogueSteps.checkFormListsAreDifferent(headphonesStores,trimmersStores);
})