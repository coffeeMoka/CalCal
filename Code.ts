function doGet(): GoogleAppsScript.HTML.HtmlOutput {
    return HtmlService.createHtmlOutputFromFile("index");
}

function processForm(formObject): string {
    const mileage = formObject.mileage;
    const calorie = formObject.calorie;
    const time = formObject.time;
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.appendRow([mileage, calorie, time]);
    const lastRow = sheet.getLastRow();
    const calorieCell = sheet.getRange(lastRow, 2).getA1Notation();
    const timeCell = sheet.getRange(lastRow, 3).getA1Notation();
    sheet.getRange(lastRow, 4).setFormula("=F1+" + calorieCell);
    sheet.getRange(lastRow, 5).setFormula("=" + calorieCell + "/" + timeCell).setNumberFormat("0.0");
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
