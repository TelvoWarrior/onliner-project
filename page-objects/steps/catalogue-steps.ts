import { t } from "testcafe";
import { CataloguePage } from "../pages/catalogue-page";
import { Logger } from "testcafe-reporter-acd-html-reporter/lib/Logger";
import { CatalogueItem } from "../panels/catalogue-item";

export class CatalogueStepsImpl {

    async getItem(index:number) {
        return new CatalogueItem(index);
    }

    private async getItemTitle(item: CatalogueItem) {
        return await item.itemTitle.text;
    }

    private async getItemParameters(item: CatalogueItem) {
        return await item.itemParameters.text;
    }

    private async getItemReviewsCount(item: CatalogueItem) {
        return parseFloat((await item.reviewCount.innerText).slice(1, -1));
    }

    private async getOffersCount(item: CatalogueItem) {
        return parseFloat(await item.offersButton.innerText);
    }

    private async getItemPrice(item: CatalogueItem) {
        return parseFloat(((await item.price.innerText).replace(/[^\d,]/g, "")).replace(`,`, `.`));
    }

    private async getUsedItemPrice(item: CatalogueItem) {
        let usedPrice = await item.used.innerText;
        usedPrice = parseFloat(await usedPrice.replace(/[^\d,]/g, "")).toFixed(2);
        usedPrice = parseFloat(usedPrice)
        return usedPrice;
    }

    async checkPageTitleContainsString(string: string) {
        Logger.info(`Check catalogue page title [${await CataloguePage.TITLE.innerText}] contains [${string}]`);
        await t.expect(await CataloguePage.TITLE.innerText).contains(string, `Check that current catalogue page title contains ${string}`);
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

    async checkItemHasReview(expectedAmount: number = 1, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] reviews`);
        const itemReview = await this.getItemReviewsCount(item);
        await t.expect(itemReview >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} reviews`);
    }

    async checkItemHasOffer(expectedAmount: number = 1, item: CatalogueItem) {
        Logger.info(`Check [${await this.getItemTitle(item)}] item has at least [${expectedAmount}] offers`);
        const itemOffer = await this.getOffersCount(item);
        await t.expect(itemOffer >= expectedAmount).ok(`Check ${await this.getItemTitle(item)} item has at least ${expectedAmount} offers`);
    }

    async checkGoodsAmountGreaterThan(number: number) {
        Logger.info(`Check items amount in catalogue list is greater than [${number}]`);
        await t.expect(await CataloguePage.getItemsCount() > number).ok(`Check that fact item amount in catalogue list is greater than ${number}`);
    }

    async findUsedOfferAndCheckItsLowerThanNewOne() {
        const itemsCount = await CataloguePage.getItemsCount();
        for (let i = 0; i < itemsCount; i++) {
            const item = await CatalogueSteps.getItem(i);
            const usedSelector = await item.used;
            if (await usedSelector.exists) {
                Logger.info(`Check [${await this.getItemTitle(item)}] item [used] and [new] prices`);
                const usedPrice = await this.getUsedItemPrice(item);
                const newPrice = await this.getItemPrice(item);
                await t.expect(usedPrice<newPrice).ok(`Check [${await this.getItemTitle(item)}] item has used offer and it's price [${usedPrice}] lower than new [${newPrice}]`);
                break
            } 
        }
    }

    async checkItemsAreDifferent(headphone:CatalogueItem, trimmer:CatalogueItem) {
        const headphonePrice = await this.getItemPrice(headphone);
        const trimmerPrice = await this.getItemPrice(trimmer);
        const headphoneDescription = await this.getItemParameters(headphone);
        const trimmerDescription = await this.getItemParameters(trimmer);
        const headphoneName = await this.getItemTitle(headphone);
        const trimmerName = await this.getItemTitle(trimmer);
        console.log(`Prices: headphone ${headphonePrice}, trimmer ${trimmerPrice}`)
        console.log(`Description: headphone ${headphoneDescription}, trimmer ${trimmerDescription}`)
        console.log(`Name: headphone ${headphoneName}, trimmer ${trimmerName}`)
        console.log(`Typeof \n price:${typeof headphonePrice} \n description:${typeof headphoneDescription} \n name:${typeof headphoneName}`)
    }
}

export const CatalogueSteps = new CatalogueStepsImpl();