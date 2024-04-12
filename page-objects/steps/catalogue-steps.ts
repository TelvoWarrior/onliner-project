import { t } from "testcafe";
import { Catalogue } from "../pages/catalogue";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { CatalogueItem } from "../panels/catalogue-item";

export class CatalogueStepsImpl {

    async getItemTitle(index: number) {
        const item = new CatalogueItem(index);
        return await item.itemTitle.text;
    }

    async getItemParameters(index: number) {
        const item = new CatalogueItem(index);
        return await item.itemParameters.text;
    }

    async getItemReviewsCount(index: number) {
        const item = new CatalogueItem(index);
        return parseFloat((await item.reviewCount.innerText).slice(1, -1));
    }

    async getOffersCount(index: number) {
        const item = new CatalogueItem(index);
        return parseFloat(await item.offersButton.innerText);
    }

    async getItemPrice(index: number) {
        const item = new CatalogueItem(index);
        let price = parseFloat(((await item.price.innerText).slice(0, -3)).replace(`,`, `.`));
        return price;
    }

    async getUsedItemPrice(index: number) {
        const item = new CatalogueItem(index);
        let usedPrice = await item.used.innerText;
        usedPrice = parseFloat(await usedPrice.replace(/[^\d,]/g, "")).toFixed(2);
        usedPrice = parseFloat(usedPrice)
        return usedPrice;
    }

    async checkPageTitleContainsString(string: string) {
        Logger.info(`Check catalogue page title contains ${string}`);
        await t.expect(await Catalogue.TITLE.innerText).contains(string, `Check that current catalogue page title contains ${string}`);
    }

    async checkItemTitleContainsString(string: string, index: number) {
        Logger.info(`Check ${index}'th item title contains ${string}`);
        const itemTitle = await this.getItemTitle(index);
        await t.expect(await itemTitle).contains(string, `Check that ${index}'th item title contains ${string}`);
    }

    async checkItemDescriptionContainsString(string: string, index: number) {
        Logger.info(`Check ${index}'th item parameters contains ${string}`);
        const itemParameters = await this.getItemParameters(index);
        await t.expect(await itemParameters).contains(string, `Check that ${index}'th item parameters contains ${string}`);
    }

    async checkItemHasReview(expectedAmount: number = 1, index:number) {
        Logger.info(`Check ${index}'th item has at least ${expectedAmount} reviews`);
        const itemReview = await this.getItemReviewsCount(index);
        await t.expect(itemReview >= expectedAmount).ok(`Check ${index}'th item has at least ${expectedAmount} reviews`);
    }

    async checkItemHasOffer(expectedAmount: number = 1, index:number) {
        Logger.info(`Check ${index}'th item has at least ${expectedAmount} offers`);
        const itemOffer = await this.getItemReviewsCount(index);
        await t.expect(itemOffer >= expectedAmount).ok(`Check ${index}'th item has at least ${expectedAmount} offers`);
    }

    async checkGoodsAmountGreaterThan(number: number) {
        Logger.info(`Check items amount in catalogue list is greater than ${number}`);
        await t.expect(await Catalogue.getItemsCount() > number).ok(`Check that fact item amount in catalogue list is greater than ${number}`);
    }
}

export const CatalogueSteps = new CatalogueStepsImpl();