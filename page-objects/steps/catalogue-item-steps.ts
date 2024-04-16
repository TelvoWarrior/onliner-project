import { t } from "testcafe";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { CatalogueItem } from "../panels/catalogue-item";

export class CatalogueItemStepsImpl {

    async getItemTitle(item: CatalogueItem) {
        return await item.itemTitleLabel.text;
    }

    async getItemParameters(item: CatalogueItem) {
        return await item.itemParametersLabel.text;
    }

    private async getItemReviewsCount(item: CatalogueItem) {
        return parseFloat((await item.reviewCountLabel.innerText).slice(1, -1));
    }

    private async getOffersCount(item: CatalogueItem) {
        return parseFloat(await item.offersButton.innerText);
    }

    async getItemPrice(item: CatalogueItem) {
        return parseFloat(((await item.priceButton.innerText).replace(/[^\d,]/g, "")).replace(`,`, `.`));
    }

    async getUsedItemPrice(item: CatalogueItem) {
        let usedPrice = await item.usedLabel.innerText;
        usedPrice = parseFloat(usedPrice.replace(/[^\d,]/g, "")).toFixed(2);
        return parseFloat(usedPrice);
    }

    async checkItemTitleContainsString(string: string, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item title contains [${string}]`);
        const itemTitle = await this.getItemTitle(item);
        await t.expect(await itemTitle).contains(string, `Check that ${await this.getItemTitle(item)} item title contains ${string}`);
    }

    async checkItemDescriptionContainsString(string: string, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item parameters contains [${string}]`);
        const itemParameters = await this.getItemParameters(item);
        string = string.toLowerCase();
        await t.expect(await itemParameters).contains(string, `Check that ${await this.getItemTitle(item)} item parameters contains ${string}`);
    }

    async checkItemHasReview(expectedAmount: number, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] reviews`);
        const itemReview = await this.getItemReviewsCount(item);
        await t.expect(itemReview >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} reviews`);
    }

    async checkItemHasOffer(expectedAmount: number, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] offers`);
        const itemOffer = await this.getOffersCount(item);
        await t.expect(itemOffer >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} offers`);
    }

}

export const CatalogueItemSteps = new CatalogueItemStepsImpl();