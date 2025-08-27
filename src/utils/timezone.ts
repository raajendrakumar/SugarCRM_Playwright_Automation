import { test, expect } from "@playwright/test";
import moment from "moment-timezone";

// 1. Current time in system timezone
const localTime = moment().format("YYYY-MM-DD HH:mm:ss");
console.log("Local:", localTime);

// 2. Convert time to specific timezone (New York)
const nyTime = moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
console.log("New York:", nyTime);

// 3. Parse a date in IST and convert to UTC
const dateInIST = moment.tz("2025-08-24 10:00", "Asia/Kolkata");
const convertedToUTC = dateInIST
  .clone()
  .tz("UTC")
  .format("YYYY-MM-DD HH:mm:ss");
console.log("IST → UTC:", convertedToUTC);

// Example assertion to validate conversion
expect(convertedToUTC).toBe("2025-08-24 04:30:00"); // IST is +5:30 ahead of UTC

const getTimeStamp = () => {
  const now = new Date();
  return `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
};
export default getTimeStamp;
