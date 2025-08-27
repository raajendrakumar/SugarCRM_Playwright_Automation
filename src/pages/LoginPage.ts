import { expect, Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";

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
    await this.page
      .getByRole("button", { name: this.loginButtonSelector })
      .click()
      .catch((error) => {
        logger.error("Error clicking Login Page");
        console.error(`Error clicking login button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Clicked login button"));
    //await this.page.waitForSelector(this.usernameInputSelector);
    const homePage = new HomePage(this.page);
    return homePage;
  }
}
