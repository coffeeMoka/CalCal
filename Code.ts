function doGet(): GoogleAppsScript.HTML.HtmlOutput {
    const indexFile: GoogleAppsScript.HTML.HtmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    indexFile.addMetaTag("viewport", "width=device-width,initial-scale=1");
    return indexFile;
}

function processForm(formObject): string {
    const mileage: any = formObject.mileage;
    const calorie: any = formObject.calorie;
    const time: any = formObject.time;
    const sheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActiveSheet();
    sheet.appendRow([mileage, calorie, time]);
    const lastRow: number = sheet.getLastRow();
    const calorieCell: string = sheet.getRange(lastRow, 2).getA1Notation();
    const timeCell: string = sheet.getRange(lastRow, 3).getA1Notation();
    const totalCalorie: string = "=F1+" + calorieCell;
    const timePerCalorie: string = "=" + calorieCell + "/" + timeCell;
    sheet.getRange(lastRow, 4).setFormula(totalCalorie);
    sheet.getRange(lastRow, 5).setFormula(timePerCalorie).setNumberFormat("0.0");
    return "送信完了";
}

function testFunc() {
    const formObject = {
        calorie: 200.0,
        mileage: 9.0,
        time: 30,
    };
    processForm(formObject);
}
