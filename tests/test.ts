import { Selector, t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenuSteps } from "../page-objects/steps/main-menu-steps";
import { MainMenu, MainMenuEnum } from "../page-objects/panels/main-menu";
import { CategoryItemSteps } from "../page-objects/steps/category-item-steps";
import { CategoryItem } from "../page-objects/panels/category-item";
import { LeftSideMenu } from "../page-objects/panels/leftside-menu";
import { LeftSideMenuSteps } from "../page-objects/steps/leftside-menu-steps";
import { SubCategoryItemSteps } from "../page-objects/steps/subcategory-item-steps";
import { SubCategoryItem } from "../page-objects/panels/subcategory-item";
import { CatalogueSteps } from "../page-objects/steps/catalogue-steps";
import { FormPanelSteps } from "../page-objects/steps/form-panel-steps";
import { CatalogueItem } from "../page-objects/panels/catalogue-item";

fixture(`Onliner Project`)
    .page(TEST_URL);

test(`Onliner test`, async () => {
    await t.maximizeWindow();
    await t.setNativeDialogHandler(() => true);

    Logger.step(1, `Headphones catalogue check`)
    await MainMenuSteps.click(MainMenu.getMenuItem(MainMenuEnum.CATALOGUE));
    await CategoryItemSteps.click(CategoryItem.getMenuItem(`Электроника`));
    await LeftSideMenuSteps.click(LeftSideMenu.getMenuItem(`Аудиотехника`));
    await SubCategoryItemSteps.click(SubCategoryItem.getMenuItem(`Наушники`));
    await CatalogueSteps.checkPageTitleContainsString(`Наушники`);
    await CatalogueSteps.checkGoodsAmountGreaterThan(5);
    
    for (let i = 0; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueSteps.checkItemTitleContainsString(`Наушники`, item);
        await CatalogueSteps.checkItemDescriptionContainsString(`наушники`, item);
        await CatalogueSteps.checkItemHasReview(1, item);
        await CatalogueSteps.checkItemHasOffer(1, item);
    }

    await FormPanelSteps.checkFormTitleExists(`Цена`);
    await FormPanelSteps.checkFormTitleExists(`Производитель`);
    await FormPanelSteps.checkFormTitleExists(`Магазины`);
    await FormPanelSteps.checkFormHasTextfield(`Цена`, 0);
    await FormPanelSteps.checkFormHasTextfield(`Цена`, 1);
    await FormPanelSteps.checkFormHasCheckbox(`Производитель`, 0);
    await FormPanelSteps.checkFormHasCheckbox(`Магазины`, 0);
    await FormPanelSteps.checkCheckboxExists(`В наличии на складе`);
    await FormPanelSteps.checkSuperCheckboxExists(2);
    await FormPanelSteps.checkCheckboxExists(`С доставкой по Беларуси`);
    await CatalogueSteps.findUsedOfferAndCheckItsLowerThanNewOne();
    
    Logger.step(2, `Trimmers catalogue check`)
    await MainMenuSteps.click(MainMenu.getMenuItem(MainMenuEnum.CATALOGUE));
    await CategoryItemSteps.click(CategoryItem.getMenuItem(`Дом и сад`));
    await LeftSideMenuSteps.click(LeftSideMenu.getMenuItem(`Садовая техника и инструменты`));
    await SubCategoryItemSteps.click(SubCategoryItem.getMenuItem(`Триммеры`));

    await CatalogueSteps.checkPageTitleContainsString(`Триммеры`);
    await CatalogueSteps.checkGoodsAmountGreaterThan(5);
    
    for (let i = 0; i < 5; i++) {
        const item = await CatalogueSteps.getItem(i);
        await CatalogueSteps.checkItemTitleContainsString(`Триммер`, item);
        // await CatalogueSteps.checkItemDescriptionContainsString(`Триммер`, i);
        await CatalogueSteps.checkItemHasReview(1, item);
        await CatalogueSteps.checkItemHasOffer(1, item);
    }
    
    await FormPanelSteps.checkFormTitleExists(`Цена`);
    await FormPanelSteps.checkFormTitleExists(`Производитель`);
    await FormPanelSteps.checkFormTitleExists(`Магазины`);
    await FormPanelSteps.checkFormHasTextfield(`Цена`, 0);
    await FormPanelSteps.checkFormHasTextfield(`Цена`, 1);
    await FormPanelSteps.checkFormHasCheckbox(`Производитель`, 0);
    await FormPanelSteps.checkFormHasCheckbox(`Магазины`, 0);
    await FormPanelSteps.checkCheckboxExists(`В наличии на складе`);
    await FormPanelSteps.checkSuperCheckboxExists(2);
    await FormPanelSteps.checkCheckboxExists(`С доставкой по Беларуси`);
    await CatalogueSteps.findUsedOfferAndCheckItsLowerThanNewOne();

    await t.debug();

})