import { test as setup } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.userid!);
  await loginPage.fillPassword(process.env.password!);
  await loginPage.clickLoginButton();

  // Save login state
  await page.context().storageState({ path: authFile });
});
