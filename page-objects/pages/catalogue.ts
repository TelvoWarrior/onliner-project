import { Selector } from "testcafe";
import { Label } from "../elements/label";

export class Catalogue {
    public static readonly TITLE = new Label(Selector(`H1`), `Заголовок`)
}