import { Button } from "../elements/button";

export class MainMenuStepsImpl {
    async click(item:Button) {
        await item.click();
    }
}

export const MainMenuSteps = new MainMenuStepsImpl();