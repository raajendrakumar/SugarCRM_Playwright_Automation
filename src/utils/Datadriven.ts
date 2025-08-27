import * as XLSX from "xlsx";

import * as path from "path";
export function readFileExcelData(): any[] {
  const filePath = path.resolve(__dirname, "../data/SugerCRMData.xlsx");
  console.log("📂 Loading Excel file from:", filePath);
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });
  return data;
}
export interface TestRecord {
  [key: string]: string;
}
// inside Datadriven.ts (readFileExcelData function)
const data = XLSX.utils.sheet_to_json(Set).map((row: any) => {
  Object.keys(row).forEach(key => {
    row[key] = row[key] != null ? String(row[key]) : "";  // normalize to string
  });
  return row;
});

