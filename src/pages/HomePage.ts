import { Page, expect } from "@playwright/test";

import logger from "../utils/LoggerUtil";
export default class HomePage {
  private readonly sugerCRMTitleLocator = "SugarCRM";
  private readonly profileButtonSelector = ".sicon.sicon-lg.sicon-user";
  private readonly logoutDropdownSelector =
    ".megamenu-dropdown-item[href='#logout/?clear=1']";
  readonly expandButtonSelector = "";

  constructor(private page: Page) {}

  async expectSugerCRMTitleToBeVisible(): Promise<void> {
    try {
      await expect(this.page.getByTitle(this.sugerCRMTitleLocator)).toBeVisible(
        {
          timeout: 15000,
        }
      );
      logger.info("Service title is visible");
    } catch (error) {
      logger.error(`Error checking login button: ${error}`);
      throw error; // re-throw so test still fails
    }
  }

  async clickOnLogout() {
    // Click profile button
    const profileButton = this.page.locator(this.profileButtonSelector);
    await profileButton.waitFor({ state: "visible" });
    await profileButton.click();
    logger.info("Clicked on profile button");

    // Click logout option
    const logoutButton = this.page.locator(this.logoutDropdownSelector);
    await logoutButton.waitFor({ state: "visible" });
    await logoutButton.click();
    logger.info("Clicked on logout option");
  }
}
