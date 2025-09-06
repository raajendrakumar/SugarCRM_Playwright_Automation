import { test, expect } from "@playwright/test";
import { address, exportToCsv, exportToJson, generateMultipleUserData } from "../utils/faker";

test("Faker test", (async) => {
  const testData = generateMultipleUserData(20);
  exportToJson(testData, "testData_en.json");
  exportToCsv(testData, "testData_en.csv");
  
});
