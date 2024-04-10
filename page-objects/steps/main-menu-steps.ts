import { Label } from "../elements/label";

export class MainMenuStepsImpl {
    async click(item:Label) {
        await item.click();
    }
}

export const MainMenuSteps = new MainMenuStepsImpl();