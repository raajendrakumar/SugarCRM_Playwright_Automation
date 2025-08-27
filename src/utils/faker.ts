import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as createCsvWriter from "csv-writer";
import path from "path";
import CreateOrg from "../pages/CreateOrgz";
import test from "@playwright/test";

export const address = faker.location.city();
interface UserData {
  name: string;
  email: string;
  username: string;
  phone: string;
  age: number;
  address: string;
}

const generateSingleUserData = (): UserData => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    phone: faker.phone.number(),
    age: faker.number.int({ min: 18, max: 99 }),
    address: faker.location.country(),
  };
};

export const generateMultipleUserData = (numRecords: number): UserData[] => {
  const testData: UserData[] = faker.helpers.multiple(generateSingleUserData, {
    count: numRecords,
  });
  return testData;
};

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const testdataDir = path.resolve(srcDir, "testdata");

export const exportToJson = (data: UserData[], fileName: string) => {
  if (!fs.existsSync(testdataDir)) {
    fs.mkdirSync(testdataDir, { recursive: true });
  }
  fs.writeFileSync(
    `${testdataDir}/${fileName}`,
    JSON.stringify(data, null, 2)
  );
  console.log(`Data exported to JSON file: ${testdataDir}/${fileName}`);
};

export const exportToCsv = (data: UserData[], fileName: string) => {
  if (!fs.existsSync(testdataDir)) {
    fs.mkdirSync(testdataDir, { recursive: true });
  }

  const csvWriter = createCsvWriter.createObjectCsvWriter({
    path: `${testdataDir}/${fileName}`,
    header: [
      { id: "name", title: "Name" },
      { id: "email", title: "Email" },
      { id: "username", title: "Username" },
      { id: "phone", title: "Phone" },
      { id: "age", title: "Age" },
      { id: "address", title: "Address" },
    ],
  });

  csvWriter.writeRecords(data).then(() => {
    console.log(`Data exported to CSV file: ${testdataDir}/${fileName}`);
  });
};