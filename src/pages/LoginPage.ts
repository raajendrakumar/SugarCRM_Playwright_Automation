import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";
import { url } from "inspector/promises";
const authFile = "src/config/auth.json";

export default class LoginPage {
  private readonly usernameInputSelector = "username";
  private readonly passwordInputSelector = "password";
  private readonly loginButtonSelector = "Log In";

  constructor(private page: Page) {}
  
  async navigateToLoginPage() {
      const URL = await this.page.goto("/");
    const session = await this.page.context().newCDPSession(this.page);
    await session.send("Browser.getWindowForTarget").then(async (window) => {
      await session.send("Browser.setWindowBounds", {
        windowId: window.windowId,
        bounds: { windowState: "maximized" },
      });
    });

    logger.info("Navigate to the SugerCRM URL");
  }
  async fillUsername(username: string) {
    
    const userName = await this.page
      .getByRole("textbox", { name: this.usernameInputSelector })
      .fill(username);
    logger.info("Filled username");
  }
  async fillPassword(password: string) {
    const passWord = await this.page
      .getByRole("textbox", { name: this.passwordInputSelector })
      .fill(password);
    logger.info("Filled password");
  }
  async clickLoginButton() {
    const loginButton = this.page.getByRole("button", {
      name: this.loginButtonSelector,
    });
    await loginButton.click();
    await expect(this.page).toHaveURL("https://sugardev.captiveresources.com/");
    logger.info("SugarCRM login completed");
  //await this.page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
    const homePage = new HomePage(this.page);
    return homePage;
  }
}
