import { Selector } from "testcafe";
import { Button } from "../elements/button";

export class Catalogue {
    public static readonly TITLE = new Button(Selector(`H1`), ``)
}