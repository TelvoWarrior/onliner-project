import { Selector, t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { MainMenuSteps } from "../page-objects/steps/main-menu-steps";
import { MainMenu } from "../page-objects/panels/main-menu";
import { CatalogueItemSteps } from "../page-objects/steps/catalogue-item-steps";
import { CatalogueItem } from "../page-objects/panels/catalogue-item";
import { LeftSideMenu } from "../page-objects/panels/leftside-menu";
import { LeftSideMenuSteps } from "../page-objects/steps/leftside-menu-steps";
import { SubCategoryItemSteps } from "../page-objects/steps/subcategory-item-steps";
import { SubCategoryItem } from "../page-objects/panels/subcategory-item";

fixture(`Onliner Project`)
    .page(TEST_URL);

test(`Onliner test`, async () => {
    await t.maximizeWindow();
    Logger.step(1, `First step`)
    // await t.hover(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Садовая техника и инструменты`));
    // await t.wait(1000);
    // await t.click(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Садовая техника и инструменты`));
    // await t.wait(1000);
    // await t.hover(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Триммеры`));
    // await t.wait(1000);
    // await t.click(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Триммеры`));
    // await t.debug();
    // let a = Selector(`div[class*="catalog-form__offers-item_primary"]`).count;
    // console.log(`Amount primary offer items: ${await a}`)

    // let b = Selector(`div[title="Товар с платным продвижением"]`).count;
    // console.log(`Amount paid promotion items: ${await b}`)
    let menuSelector = Selector(`ul[class*="b-main-navigation"]`);
    let menuItemCount = await menuSelector.child().count;
    await t.setNativeDialogHandler(() => true);
   
    await MainMenuSteps.click(MainMenu.CATALOGUE);
    await CatalogueItemSteps.click(CatalogueItem.ELECTRONICS);
    await LeftSideMenuSteps.click(LeftSideMenu.AUDIO);
    await SubCategoryItemSteps.click(SubCategoryItem.HEADPHONES);
    await MainMenuSteps.click(MainMenu.CATALOGUE);
    await CatalogueItemSteps.click(CatalogueItem.HOUSE_AND_GARDEN);
    await LeftSideMenuSteps.click(LeftSideMenu.GARDEN_TOOLS);
    await SubCategoryItemSteps.click(SubCategoryItem.TRIMMERS);
    await t.debug();
})