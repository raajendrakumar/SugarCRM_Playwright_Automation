import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import getTimeStamp from "../utils/timezone";

export default class CreateOrg {
  private readonly expandButtonSelector = "Open";
  private readonly organizationButtonSelector = "text=Organizations";
  //private readonly organizationMenuSelector = "Organizations menu";
  private readonly organizationMenuSelector =
    "//button[@aria-label='Organizations menu']//i[@class='sicon sicon-kebab text-white']";
  private readonly organizationCreteSelector = "Create";
  static companyName: string = `Org_Name_${getTimeStamp()}`;
  private readonly companyNameInputfieldSelector = "Company Name";
  private readonly additionalNameInputfieldSelector = "Additional Names";
  private readonly addressTabSelector = "Address";
  private readonly physicalstreetInputfieldSelector = "Physical Street";
  private readonly physicalcityInputfieldSelector = "Physical City";
  private readonly physicalstateInputfieldSelector = "Physical State";
  private readonly physicalPostInputfieldSelector = "Physical Postal Code";
  private readonly saveButtonSelector = "Save";
  constructor(private page: Page) {}
  async clickOnExpand() {
    const sideBarMenu = this.page.getByRole("button", {
      name: this.expandButtonSelector,
    });

    await this.page.waitForLoadState("networkidle");
    await this.page.waitForURL(/.*#Home.*/, { timeout: 60000 });
    // const popupPromise = this.page.waitForEvent("popup");
    // const popup = await popupPromise;
    // await popup.waitForLoadState("domcontentloaded");
    await sideBarMenu.click();
   // console.log(await popup.title());
    logger.info("Expand button clicked");
  }

  
  async hoverOnOrganizations() {
    const orgMenu = this.page.locator(this.organizationButtonSelector).first();
    await orgMenu.hover();
    await orgMenu.click({ force: true });
    console.log(await orgMenu.boundingBox());
    await this.page.waitForTimeout(1000);
    logger.info("Hovered on Organizations button");
  }
async clickOnOrganizationsMenu() {
  const menu = this.page.locator(this.organizationMenuSelector);
  const closePopupButtons = this.page.locator("button.close.btn.btn-invisible");

  if ((await closePopupButtons.count()) > 0) {
    await closePopupButtons.first().click();
    logger.info("Closed success/warning popup");
  } else {
    logger.info("No popup found to close");
  }

  await menu.click({ force: true });
  await this.page.waitForSelector("text=Organizations", { timeout: 5000 });
  logger.info("Organizations menu clicked successfully");
}
  async selectCreateOrganization() {
    const createBtn = this.page.getByRole("button", {
      name: "Create",
      exact: true,
    });
    await createBtn.waitFor({ state: "visible" });
    await createBtn.click();
    logger.info("Clicked on Create organization button");
  }
  async enterCompanyName() {
    const orgID = await this.page
      .getByRole("textbox", {
        name: this.companyNameInputfieldSelector,
        exact: true,
      })
      .fill(CreateOrg.companyName);
    console.log(orgID);
    logger.info("Entered company name");
  }
  async enterAdditionalName(value: string) {
    await this.page
      .getByRole("textbox", { name: this.additionalNameInputfieldSelector })
      .fill(value);
    logger.info("Entered additional name" + value);
  }
  async clickOnAddressTab() {
    await this.page.getByRole("tab", { name: this.addressTabSelector }).click();
    logger.info("Clicked on address tab");
  }
  async enterPhysicalStreet(value: string) {
    await this.page
      .getByRole("textbox", { name: this.physicalstreetInputfieldSelector })
      .fill(value);
    logger.info("Entered Physical Street");
  }
  async enterPhysicalCity(value: string) {
    await this.page
      .getByRole("textbox", { name: this.physicalcityInputfieldSelector })
      .fill(value);
    logger.info("Entered physical city");
  }
  async enterPhysicalState(value: string) {
    await this.page
      .getByRole("textbox", { name: this.physicalstateInputfieldSelector })
      .fill(value);
    logger.info("Entered physical state");
  }
  async enterPhysicalPost(value: any) {
    await this.page
      .getByRole("textbox", { name: this.physicalPostInputfieldSelector })
      .fill(value);
    logger.info("Entered physical post");
  }
  async saveOrganationDetails() {
    await this.page
      .getByRole("button", { name: this.saveButtonSelector })
      .click();
    logger.info("Clicked on organazation save button");
  }
}
