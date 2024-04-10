import { BaseElement } from "./base-element";

export class Checkbox extends BaseElement {
    constructor(selector: string | Selector, elementName: string) {
        super(selector, elementName, 'Checkbox')
    }
}