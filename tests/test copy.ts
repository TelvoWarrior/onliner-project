import { t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenu } from "../page-objects/panels/main-menu";
import { CategoryItem } from "../page-objects/panels/category-item";
import { CatalogueSteps } from "../page-objects/steps/catalogue-steps";
import { CatalogueItem } from "../page-objects/panels/catalogue-item";
import { CategoryMenuEnum, LeftSideMenuEnum, MainMenuEnum, SubCategoryMenuEnum } from "../page-objects/enums/menu-items-enum";
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
    await t.debug();
    
    const headphonetext = await (await CatalogueSteps.getItem(0)).itemTitle.innerText;
    
    
    await MainMenu.getMenuItem(MainMenuEnum.CATALOGUE).click();
    await CategoryItem.getCategoryItem(CategoryMenuEnum.HOUSE_AND_GARDEN).click();
    await CategoryItem.getLeftSideItem(LeftSideMenuEnum.GARDEN_TOOLS).click();
    await CategoryItem.getSubCategoryItem(SubCategoryMenuEnum.TRIMMERS).click();
    
    const trimmer = await CatalogueSteps.getItem(0);
    console.log(await headphonetext)
    console.log(await trimmer.itemTitle.innerText)
    
    await t.debug();
})