import { Page, expect } from "@playwright/test";
import getTimeStamp from "../pages/CreateOrgz";
import logger from "../utils/LoggerUtil";
import CreateOrg from "../pages/CreateOrgz";
import { error } from "console";

export default class CreateSubmn {
  private readonly createSubmissionButtonSel = "Create";
  public prospectCaseID = 'a:has-text("TestCaseID_';
  private readonly submissionTabSel = "//h4[text()='Submissions']";
  private readonly submissionNameInputfieldSel =
    "//span[@class='record-label' and text()='Submission Name']/following-sibling::span//input[@type='text']";
  private readonly captiveNameDDSel =
    "//div[@data-name='tai_captives_opportunities_1_name']//a[contains(@class,'select2-choice')]//span[@class='select2-chosen']";
  private readonly secondaryCaptiveExecutive =
    "//div[@data-name='secondary_captive_executive_c']//a[contains(@class,'select2-choice')]";
  private readonly searchInputfieldSel =
    "//div[@id='select2-drop']//div[@class='select2-search']/descendant::input[@type='text']";
  private readonly programManagerDDSel =
    "//div[@data-name='program_manager_c']//a[contains(@class,'select2-choice')]";
  private readonly secondaryManagerDDSel =
    "//div[@data-name='secondary_program_manager_c']//a[contains(@class,'select2-choice')]";
  private readonly recieivedSubmissionDateSel =
    "//input[@name='date_received_c']";
  private readonly submissionTypeDDSel =
    "//div[@data-name='opportunity_type']//a[contains(@class,'select2-choice')]//span[@class='select2-chosen']";
  private readonly brokerDDSel =
    "//div[@data-name='brok_brokers_opportunities_1_name']//a[contains(@class,'select2-choice')]";
  private readonly productStructureDDSel =
    "//div[@data-name='pod_structure_c']//a[contains(@class,'select2-choice')]//span[@class='select2-chosen']";
  private readonly businessDeveExeDDSel =
    "//div[@data-name='marketing_user_c']//a[contains(@class,'select2-choice')]";
  private readonly captiveExecutiveDDSel =
    "//div[@data-name='captive_executive_1_c']//a[contains(@class,'select2-choice')]";
  private readonly associatedCaptiveExeDDSel =
    "//div[@data-name='associate_captive_executive_c']//a[contains(@class,'select2-choice')]";
  private readonly programCoordinatorDDSel =
    "//div[@data-name='program_coordinator_c']//a[contains(@class,'select2-choice')]";
  private readonly effictiveDateSel = "//input[@name='effective_date_c']";
  private readonly lineOfBussinessDDSel =
    "//div[@data-name='line_of_business_c']//a[contains(@class,'select2-choice')]";
  private readonly brokerContrAcctDDSel =
    "//div[@data-name='broker_controlled_account_c']//a[contains(@class,'select2-choice')]";
  private readonly saveSubmissionDetails = "Save";
  private readonly prospectNumberSel =
    "//span[@data-fieldname='pega_case_no_c']/child::span/child::div";
  private readonly midTermDealDD = "//span[@data-fieldname='mid_term_deal_c']";
  private readonly casualtyLineCov =
    "//span[@data-fieldname='casualty_line_c']/child::span/child::div";
  companyName: string;

  constructor(private page: Page) {}
  async linkSubmission(): Promise<void> {
    // const submissionCaseLink = this.page.getByRole("link", {
    //   name: CreateOrg.companyName,
    // });

    const caseLink = this.page.locator("link", { hasText: /^PRCaseID_/ }).first();
    const caseId = await caseLink.textContent();
    await caseLink.waitFor({ state: "visible" });
    await expect(caseLink).toHaveText(CreateOrg.companyName);
    await caseLink.click();

    logger.info(`Clicked on CaseID: ${caseId}`);
  }

  async hoverSubmission() {
    const submissionTab = this.page.locator(this.submissionTabSel);
    await expect(submissionTab).toHaveText("Submissions");
    await submissionTab.waitFor({ state: "visible" });
    await submissionTab.hover();
    await this.page.waitForTimeout(1000);
    logger.info("Hovered on submission Tab");
  }
  async createSubmission() {
    const addSubmitionDetails = this.page.getByRole("button", {
      name: this.createSubmissionButtonSel,
      exact: true,
    });
    await addSubmitionDetails.waitFor({ state: "visible" });
    await addSubmitionDetails.hover();
    await addSubmitionDetails.click({ force: true });
    await this.page.waitForTimeout(10000);
    logger.info("Clicked on submission add button");
  }
  async enterSubmissionName() {
    const submID = await this.page
      .locator(this.submissionNameInputfieldSel)
      .nth(0)
      .fill(CreateOrg.companyName);
    console.log(submID);
    logger.info("Entered submission name");
  }
  async clickCaptiveName() {
    const captiveName = this.page.locator(this.captiveNameDDSel).first();
    await captiveName.click({ force: true });
    logger.info("Clicked on Captive Name DD");
  }
  async enterCaptiveName(value: string) {
    const captiveName = this.page.locator(this.searchInputfieldSel);
    await captiveName.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered Captive Name DD");
  }

  async clickSecondaryCapExeDD() {
    const secondaryCaptiveExe = this.page.locator(
      this.secondaryCaptiveExecutive
    );
    await secondaryCaptiveExe.click({ force: true });
    logger.info("Clicked on Captive Name DD");
  }
  async enterSecondaryCaptiveExe(value: string) {
    const secryCaptiveExe = this.page.locator(this.searchInputfieldSel).first();
    await secryCaptiveExe.fill(value);
    await secryCaptiveExe.waitFor({ state: "visible" });
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered secondary program executive ");
  }

  async clickProgramManagerDD() {
    await this.page.locator(this.programManagerDDSel).click({ force: true });
    logger.info("Clicked on Captive Name DD");
  }
  async enterProgramManager(value: string) {
    const progrmaManager = this.page.locator(this.searchInputfieldSel).first();
    await progrmaManager.fill(value);
    await progrmaManager.waitFor({ state: "visible" });
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered program Manager ");
  }
  async clickOnSecondaryManagerDD() {
    await this.page.locator(this.secondaryManagerDDSel).click();
    logger.info("Clicked on Secondary Manager DD");
  }
  async enterSecondaryManager(value: string) {
    const secondaryManager = this.page
      .locator(this.searchInputfieldSel)
      .first();
    await secondaryManager.fill(value);
    await secondaryManager.waitFor({ state: "visible" });
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered Secondary Manager");
  }
  async enterSubmissionDate(valueFromExcel: string | number) {
    const formattedDate = valueFromExcel.toString();
    const submissionDate = this.page.locator(this.recieivedSubmissionDateSel);
    await submissionDate.waitFor({ state: "visible" });
    await submissionDate.fill(formattedDate); // safe now
    await this.page.keyboard.press("Enter");
    logger.info(`Entered received Submission Date: ${formattedDate}`);
  }

  async selectSubmissionType() {
    await this.page.locator(this.submissionTypeDDSel).click();
    await this.page.getByRole("option", { name: "New", exact: true }).click();
  }

  async clickOnbrokerDD() {
    await this.page.locator(this.brokerDDSel).click();
    logger.info("Clicked on broker dd");
  }
  async enterbrokerDD(value: string) {
    const brokerName = this.page.locator(this.searchInputfieldSel).first();
    await brokerName.waitFor({ state: "visible" });
    await brokerName.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered broker dropdown");
  }

  async selectProductStructure(value: string) {
    await this.page.locator(this.productStructureDDSel).click();
    await this.page.locator(`.select2-results li:has-text("${value}")`).click();
    console.log(`Selected product structure: ${value}`);
  }

  async selBusinessDeveExeDD() {
    await this.page.locator(this.businessDeveExeDDSel).click();
    logger.info("Clicked on Business Development Executive dropdown");
  }
  async enterbusinessDeveExe(value: string) {
    const businessDeveExe = this.page.locator(this.searchInputfieldSel).first();
    await businessDeveExe.waitFor({ state: "visible" });
    await businessDeveExe.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info("Entered Business Development Executive");
  }
  async clickCaptiveExecutive() {
    await this.page.locator(this.captiveExecutiveDDSel).click();
    logger.info("Clicked on Captive Executive dropdown");
  }
  async enterCaptiveExecutive(value: string) {
    const captiveExecutive = this.page.locator(this.searchInputfieldSel);
    await captiveExecutive.waitFor({ state: "visible" });
    await captiveExecutive.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info(`Searched captiveExecutive: ${value}`);
  }

  async clickAssociatedCaptiveExeDDSel() {
    await this.page.locator(this.associatedCaptiveExeDDSel).click();
    logger.info("Clicked on Associate Captive Executive dropdown");
  }
  async enterAssociatedCaptiveExe(value: string) {
    const srcAssociatedCaptiveExe = this.page.locator(this.searchInputfieldSel);
    await srcAssociatedCaptiveExe.waitFor({ state: "visible" });
    await srcAssociatedCaptiveExe.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info(`Searched  Associate Captive Executive: ${value}`);
  }
  async clickProgramCoordinator() {
    await this.page.locator(this.programCoordinatorDDSel).click();
    logger.info("Clicked on Program Coordinator dropdown");
  }
  async enterProgramCoordinator(value: string) {
    const srcProgramCoordinator = this.page.locator(this.searchInputfieldSel);
    await srcProgramCoordinator.waitFor({ state: "visible" });
    await srcProgramCoordinator.fill(value);
    await this.page
      .locator("li.select2-searching")
      .waitFor({ state: "detached", timeout: 5000 });
    const option = this.page.locator(
      ".select2-results__option, div.select2-result-label",
      {
        hasText: value,
      }
    );
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();
    logger.info(`Searched  Program Coordinator: ${value}`);
  }
  async enterEffectiveDate(valueFromExcel: string | number) {
    const formattedDate = valueFromExcel.toString();
    const effectiveDate = this.page.locator(this.effictiveDateSel);
    await effectiveDate.waitFor({ state: "visible" });
    await effectiveDate.fill(formattedDate);
    await this.page.keyboard.press("Enter");
    await expect(effectiveDate).toHaveValue(formattedDate);
    logger.info(`Entered Effective Date:${formattedDate}`);
  }

  async selectLineOfBussiness(value: string) {
    await this.page.locator(this.lineOfBussinessDDSel).click();
    logger.info("Clicked on Line Of Business dropdown");
    await this.page.locator(`.select2-results li:has-text("${value}")`).click();
    logger.info(`Selected Line Of Business: ${value}`);
  }
  async selBrokerContrAcct() {
    await this.page.locator(this.brokerContrAcctDDSel).click();
    await this.page.locator('.select2-results li:has-text("Yes")').click();
    logger.info("Selected 'Yes' in Broker Contract Account dropdown");
  }

  async selectCasualtyLineCoverage(values: string[]) {
    for (const value of values) {
      await this.page.locator(this.casualtyLineCov).click();
      await this.page.getByRole("option", { name: value, exact: true }).click();
      logger.info(`Selected coverage option: ${value}`);
    }
  }
  async midTermDeal() {
    await this.page.locator(this.midTermDealDD).click();
    await this.page.getByRole("option", { name: "Yes", exact: true }).click();
    logger.info("Selected Mid Term Deal: Yes");
  }
  async savedSubmissionDetails() {
    const saveSubmissionData = this.page.getByRole("button", {
      name: this.saveSubmissionDetails,
    });
    await saveSubmissionData.waitFor({ state: "visible", timeout: 5000 });
    await saveSubmissionData.click();

    logger.info("Clicked on save submission details");
  }
  async clickSubmissionCase(companyName: string) {
    await this.page.getByRole("link", { name: this.prospectCaseID }).click();
    logger.info("Click on prospect case ID");
  }
}
