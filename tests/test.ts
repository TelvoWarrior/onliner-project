import { Selector, t } from "testcafe";
import { TEST_URL } from "../test-data/configuration";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";

fixture(`Onliner Project`)
    .page(TEST_URL);

test(`Onliner test`, async () => {
    await t.maximizeWindow();
    Logger.step(1, `First step`)
    await t.hover(Selector(Selector(`a[href*="catalog"][class="b-main-navigation__link"]`)));
    await t.wait(1000);
    await t.click(Selector(Selector(`a[href*="catalog"][class="b-main-navigation__link"]`)));
    await t.wait(1000);
    await t.hover(Selector(`span`).withText(`Электроника`));
    await t.wait(1000);
    await t.click(Selector(`span`).withText(`Электроника`));
    await t.wait(1000);
    await t.hover(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Аудиотехника`));
    await t.wait(1000);
    await t.click(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Аудиотехника`));
    await t.wait(1000);
    await t.hover(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Наушники`));
    await t.wait(1000);
    await t.click(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Наушники`));
    await t.wait(1000);
    await t.hover(Selector(Selector(`a[href*="catalog"][class="b-main-navigation__link"]`)));
    await t.wait(1000);
    await t.click(Selector(Selector(`a[href*="catalog"][class="b-main-navigation__link"]`)));
    await t.wait(1000);
    await t.hover(Selector(`span`).withText(`Дом и сад`));
    await t.wait(1000);
    await t.click(Selector(`span`).withText(`Дом и сад`));
    await t.wait(1000);
    await t.hover(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Садовая техника и инструменты`));
    await t.wait(1000);
    await t.click(Selector(`div[class="catalog-navigation-list__aside-title"]`).withText(`Садовая техника и инструменты`));
    await t.wait(1000);
    await t.hover(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Триммеры`));
    await t.wait(1000);
    await t.click(Selector(`span[class="catalog-navigation-list__dropdown-title"]`).withText(`Триммеры`));
    await t.debug();
    let a = Selector(`div[class*="catalog-form__offers-item_primary"]`).count;
    console.log(`Amount primary offer items: ${await a}`)

    let b = Selector(`div[title="Товар с платным продвижением"]`).count;
    console.log(`Amount paid promotion items: ${await b}`)

})