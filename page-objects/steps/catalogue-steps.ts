import { t } from "testcafe";
import { CataloguePage } from "../pages/catalogue-page";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { CatalogueItem } from "../panels/catalogue-item";
import { CatalogueItemValue } from "../entities/catalogue-item-value";
import { CatalogueItemSteps } from "./catalogue-item-steps";

export class CatalogueStepsImpl {

    async getItem(index: number) {
        return new CatalogueItem(index);
    }

    private async getCatalogueItemsCount() {
        const page = new CataloguePage();
        return await page.catalogueItemSelector.count;
    }

    async checkPageTitleContainsString(string: string) {
        Logger.info(`Check catalogue page title [${await new CataloguePage().pageTitleText}] contains [${string}]`);
        await t.expect(await new CataloguePage().pageTitleText).contains(string, `Check that current catalogue page title contains ${string}`);
    }

    async checkGoodsAmountGreaterThan(number: number) {
        Logger.info(`Check items amount in catalogue list is greater than [${number}]`);
        await t.expect(await this.getCatalogueItemsCount() > number).ok(`Check that fact item amount in catalogue list is greater than ${number}`);
    }

    async findUsedOfferAndCheckItsLowerThanNewOne() {
        const itemsCount = await this.getCatalogueItemsCount();
        for (let i = 0; i < itemsCount; i++) {
            const item = await CatalogueSteps.getItem(i);
            const usedSelector = item.usedLabel;
            if (await usedSelector.exists) {
                Logger.info(`Check [${await CatalogueItemSteps.getItemTitle(item)}] item [used] and [new] prices`);
                const usedPrice = await CatalogueItemSteps.getUsedItemPrice(item);
                const newPrice = await CatalogueItemSteps.getItemPrice(item);
                await t.expect(usedPrice < newPrice).ok(`Check [${await CatalogueItemSteps.getItemTitle(item)}] item has used offer and it's price [${usedPrice}] lower than new [${newPrice}]`);
                break
            }
        }
    }

    async checkItemsAreDifferent(headphone: CatalogueItemValue, trimmer: CatalogueItemValue) {
        Logger.info(`Checking difference between [${await headphone.nameValuePromise}] and [${await trimmer.nameValuePromise}]`);
        await t.expect(await headphone.priceValuePromise !== await trimmer.priceValuePromise)
            .ok(`Check [${await headphone.nameValuePromise}]'s price [${await headphone.priceValuePromise}] isn't the same as [${await trimmer.nameValuePromise}]'s price [${await trimmer.priceValuePromise}]`);
        await t.expect(await headphone.descriptionValuePromise !== await trimmer.descriptionValuePromise)
            .ok(`Check [${await headphone.nameValuePromise}]'s description [${await headphone.descriptionValuePromise}] isn't the same as [${await trimmer.nameValuePromise}]'s description [${await trimmer.descriptionValuePromise}]`);
        await t.expect(await headphone.nameValuePromise !== await trimmer.nameValuePromise)
            .ok(`Check [${await headphone.nameValuePromise}] name isn't the same as [${await trimmer.nameValuePromise}] name`);
    }

    async checkFormListsAreDifferent(first: string[], second: string[]) {
        await t.expect(first.sort().join() !== second.sort().join()).ok(`Check lists are different`);
    }

    async closePopups() {
        const button = new CataloguePage().acceptButton;
        const count = await new CataloguePage().acceptButton.count;
        for (let i = 0; i < count; i++) {
            await button.click();
        }
    }
}

export const CatalogueSteps = new CatalogueStepsImpl();