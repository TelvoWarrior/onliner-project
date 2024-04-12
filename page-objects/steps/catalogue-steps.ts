import { t } from "testcafe";
import { Catalogue } from "../pages/catalogue";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { CatalogueItem } from "../panels/catalogue-item";

export class CatalogueStepsImpl {

    async getItem(index:number) {
        return new CatalogueItem(index);
    }

    async getItemTitle(item: CatalogueItem) {
        return await item.itemTitle.text;
    }

    async getItemParameters(item: CatalogueItem) {
        return await item.itemParameters.text;
    }

    async getItemReviewsCount(item: CatalogueItem) {
        return parseFloat((await item.reviewCount.innerText).slice(1, -1));
    }

    async getOffersCount(item: CatalogueItem) {
        return parseFloat(await item.offersButton.innerText);
    }

    async getItemPrice(item: CatalogueItem) {
        let price = parseFloat(((await item.price.innerText).slice(0, -3)).replace(`,`, `.`));
        return price;
    }

    async getUsedItemPrice(item: CatalogueItem) {
        let usedPrice = await item.used.innerText;
        usedPrice = parseFloat(await usedPrice.replace(/[^\d,]/g, "")).toFixed(2);
        usedPrice = parseFloat(usedPrice)
        return usedPrice;
    }

    async checkPageTitleContainsString(string: string) {
        Logger.info(`Check catalogue page title [${await Catalogue.TITLE.innerText}] contains [${string}]`);
        await t.expect(await Catalogue.TITLE.innerText).contains(string, `Check that current catalogue page title contains ${string}`);
    }

    async checkItemTitleContainsString(string: string, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item title contains [${string}]`);
        const itemTitle = await this.getItemTitle(item);
        await t.expect(await itemTitle).contains(string, `Check that ${await this.getItemTitle(item)} item title contains ${string}`);
    }

    async checkItemDescriptionContainsString(string: string, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item parameters contains [${string}]`);
        const itemParameters = await this.getItemParameters(item);
        await t.expect(await itemParameters).contains(string, `Check that ${await this.getItemTitle(item)} item parameters contains ${string}`);
    }

    async checkItemHasReview(expectedAmount: number = 1, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] reviews`);
        const itemReview = await this.getItemReviewsCount(item);
        await t.expect(itemReview >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} reviews`);
    }

    async checkItemHasOffer(expectedAmount: number = 1, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] offers`);
        const itemOffer = await this.getItemReviewsCount(item);
        await t.expect(itemOffer >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} offers`);
    }

    async checkGoodsAmountGreaterThan(number: number) {
        Logger.info(`Check items amount in catalogue list is greater than [${number}]`);
        await t.expect(await Catalogue.getItemsCount() > number).ok(`Check that fact item amount in catalogue list is greater than ${number}`);
    }

    async findUsedOfferAndCheckItsLowerThanNewOne() {
        const itemsCount = await Catalogue.getItemsCount();
        for (let i = 0; i < itemsCount; i++) {
            const item = await CatalogueSteps.getItem(i);
            const usedSelector = await item.used;
            if (await usedSelector.exists) {
                Logger.info(`Check [${await this.getItemTitle(item)}] item [used] and [new] prices`);
                const usedPrice = await this.getUsedItemPrice(item);
                const newPrice = await this.getItemPrice(item);
                await t.expect(usedPrice<newPrice).ok(`Check [${await this.getItemTitle(item)}] item has used offer and it's price [${usedPrice}] lower than new [${usedSelector}]`);
                break
            } 
        }
    }
}

export const CatalogueSteps = new CatalogueStepsImpl();