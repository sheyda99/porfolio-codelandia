const fs = require("fs");
const path = require("path");
const util = require("util");
const idGenerator = require("../utils/id-generator");
const getRootPath = require("../utils/root-path");

const DB_FILE_PATH = path.join(getRootPath(), "database/db.json"); 

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Private function
async function getAllJSONDataFromText() {
    const allText = await readFileAsync(DB_FILE_PATH);
    const allData = JSON.parse(allText);
    return allData;
}

// Public functions
async function getData(key) {
    const allData = await getAllJSONDataFromText();
    return allData[key];
}

async function insertData(jsonKey, model) {
    const allData = await getAllJSONDataFromText();
    const newModel = { "id": idGenerator(allData[jsonKey]), ...model };
    allData[jsonKey].push(newModel);
    await writeFileAsync(DB_FILE_PATH, JSON.stringify(allData, null, 2));
    return newModel;
}

async function updateSingleData(jsonKey, updatedId, updatedData) {
    const allData = await getAllJSONDataFromText();
    allData[jsonKey][updatedId] = { "id": updatedId.toString(), ...updatedData };
    await writeFileAsync(DB_FILE_PATH, JSON.stringify(allData, null, 2));
    return allData[jsonKey][updatedId];
}

async function updateAllData(jsonKey, updatedId, updatedData) {
    const allData = await getAllJSONDataFromText();
    const index = allData[jsonKey].findIndex(service => service.id == updatedId);
    if (index !== -1) {
        allData[jsonKey][index] = { "id": updatedId.toString(), ...updatedData };
        await writeFileAsync(DB_FILE_PATH, JSON.stringify(allData, null, 2));
        return allData[jsonKey][index];
    } else {
        return null;
    }
}

async function deleteData(jsonKey, deletedId) {
    const allData = await getAllJSONDataFromText();
    const deletedData = allData[jsonKey].filter(service => service.id == deletedId);
    if(deletedData.length == 0)
        return null;
    allData[jsonKey] = allData[jsonKey].filter(service => service.id != deletedId);
    await writeFileAsync(DB_FILE_PATH, JSON.stringify(allData, null, 2));
    return deletedData[0];
}

module.exports = {
    getData,
    insertData,
    updateSingleData,
    updateAllData,
    deleteData
}