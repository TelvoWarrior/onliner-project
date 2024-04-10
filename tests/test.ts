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
import { FormPanel } from "../page-objects/panels/form-panel";
import { FormPanelSteps } from "../page-objects/steps/form-panel-steps";

fixture(`Onliner Project`)
    .page(TEST_URL);

test(`Onliner test`, async () => {
    await t.maximizeWindow();
    await t.setNativeDialogHandler(() => true);

    Logger.step(1, `First step`)

    await MainMenuSteps.click(MainMenu.getMenuItem(MainMenuEnum.CATALOGUE));
    await CategoryItemSteps.click(CategoryItem.getMenuItem(`Электроника`));
    await LeftSideMenuSteps.click(LeftSideMenu.getMenuItem(`Аудиотехника`));
    await SubCategoryItemSteps.click(SubCategoryItem.getMenuItem(`Наушники`));
    await MainMenuSteps.click(MainMenu.getMenuItem(MainMenuEnum.CATALOGUE));
    await CategoryItemSteps.click(CategoryItem.getMenuItem(`Дом и сад`));
    await LeftSideMenuSteps.click(LeftSideMenu.getMenuItem(`Садовая техника и инструменты`));
    await SubCategoryItemSteps.click(SubCategoryItem.getMenuItem(`Триммеры`));
    // await FormPanelSteps.checkFormTitleExists(`Цена`);
    // await FormPanelSteps.checkFormHasTextfield(`Цена`,0);
    // await FormPanelSteps.checkFormHasTextfield(`Цена`,1);
    // await FormPanelSteps.checkFormTitleExists(`Производитель`);
    // await FormPanelSteps.checkFormHasCheckbox(`Производитель`,0);
    // await FormPanelSteps.checkFormTitleExists(`Магазины`);
    // await FormPanelSteps.checkFormHasCheckbox(`Магазины`,0);
    // await FormPanelSteps.checkCheckboxExists(`С доставкой по Беларуси`)
    // await FormPanelSteps.checkCheckboxExists(`В наличии на складе`)
    await FormPanelSteps.click(FormPanel.getSuperCheckbox(2));
    await FormPanelSteps.checkSuperCheckboxExists(2);
    await t.debug();
})