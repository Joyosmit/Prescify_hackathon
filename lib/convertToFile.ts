export function createJsonFile(data: any, fileName = "prescription.json") {
    const jsonString = JSON.stringify(data, null, 2); // Pretty-print JSON
    const blob = new Blob([jsonString], { type: "application/json" });
    return new File([blob], fileName, { type: "application/json" });
}
