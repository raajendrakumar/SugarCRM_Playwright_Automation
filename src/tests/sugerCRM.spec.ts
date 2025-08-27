import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { encrypt, decrypt } from "../utils/CryptojsUtils";
import { encryptEnvFile } from "../utils/EncryptoFile";
import CreateOrg from "../pages/CreateOrgz";
import CreateSubmn from "../pages/CreateSubm";
import { readFileExcelData } from "../../src/utils/Datadriven";
import path from "path";
import { address } from "../utils/faker";

const excelData = readFileExcelData();

test.describe("Regression Testing", async () => {
  for (const [index, record] of excelData.entries()) {
    test(`SugarCRM Case test: ${record.AdditionalName || "Users" + index}`, async ({
      page,
    }) => {
      const loginPage = new LoginPage(page);
      const createOrg = new CreateOrg(page);
      const createSubm = new CreateSubmn(page);
      {
        timeout: 60000;
      }
      // ✅ Login
      await loginPage.navigateToLoginPage();
      await loginPage.fillUsername(process.env.userid!);
      await loginPage.fillPassword(process.env.password!);
      const homePage: HomePage = await loginPage.clickLoginButton();
      console.log("✅ Login completed");

      // Wait for dashboard
      await homePage.expectSugerCRMTitleToBeVisible();

      // ✅ Organization creation
      await createOrg.clickOnExpand();
      console.info("▶️ Click on Expand button");

      await createOrg.hoverOnOrganizations();
      // await createOrg.clickOnOrganizationsMenu();
      await createOrg.selectCreateOrganization();

      await createOrg.enterCompanyName();
      await createOrg.enterAdditionalName(record.AdditionalNames);
      await createOrg.clickOnAddressTab();
      await createOrg.enterPhysicalStreet(record.PhysicalStreet);
      await createOrg.enterPhysicalCity(record.PhysicalCity);
      await createOrg.enterPhysicalState(record.PhysicalState);
      await createOrg.enterPhysicalPost("28909");
      await createOrg.saveOrganationDetails();

      // ✅ Submission creation
      const caseId = await createOrg.enterCompanyName();
      await createSubm.linkSubmission();
      await createSubm.hoverSubmission();
      await createSubm.createSubmission();
      await createSubm.enterSubmissionName();
      await createSubm.clickCaptiveName();
      await createSubm.enterCaptiveName(record.Captive);
      await createSubm.clickSecondaryCapExeDD();
      await createSubm.enterSecondaryCaptiveExe(
        record.SecondaryCaptiveExecutive
      );
      await createSubm.clickProgramManagerDD();
      await createSubm.enterProgramManager(record.ProgramManager);
      await createSubm.clickOnSecondaryManagerDD();
      await createSubm.enterSecondaryManager(record.SecondaryProgramManager);
      await createSubm.enterSubmissionDate("05/16/2021"); //submission date
      await createSubm.selectSubmissionType();
      await createSubm.clickOnbrokerDD();
      await createSubm.enterbrokerDD(record.Broker);
      await createSubm.selectProductStructure("Two Men and a Truck");
      await createSubm.selBusinessDeveExeDD();
      await createSubm.enterbusinessDeveExe(
        record.BusinessDevelopmentExecutive
      );
      await createSubm.clickCaptiveExecutive();
      await createSubm.enterCaptiveExecutive(record.CaptiveExecutive);
      await createSubm.clickAssociatedCaptiveExeDDSel();
      await createSubm.enterAssociatedCaptiveExe(
        record.AssociateCaptiveExecutive
      );
      await createSubm.clickProgramCoordinator();
      await createSubm.enterProgramCoordinator(record.ProgramCoordinator);
      await createSubm.enterEffectiveDate("05/06/2021"); //effective date
      await createSubm.selectLineOfBussiness(record.LineOfBusiness);
      await createSubm.selBrokerContrAcct();
      await createSubm.selectCasualtyLineCoverage(["GL", "WC", "AL", "APD"]);
      await createSubm.midTermDeal();
      await createSubm.savedSubmissionDetails();
      await page.waitForLoadState("networkidle");
      // ✅ Logout
      //await homePage.expectSugerCRMTitleToBeVisible();
      await homePage.clickOnLogout();
      console.info("🔄 Logout from sugarCRM");
    });
  }
  // test("Env test", async ({ page }) => {
  //   const plaintest = "Plawright,ts";
  //   const encryptedText = encrypt(plaintest);
  //   console.log("SALT:", process.env.SALT);
  //   console.log("Encrypted:", encryptedText);
  //   const decryptedText = decrypt(encryptedText);
  //   console.log("Decrypted:", decryptedText);
  //   encryptEnvFile();
  // });
});
