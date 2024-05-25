const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_UPDATED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getAboutData() {
    return await baseService.getData(JSON_MODEL_KEYS.ABOUT);
}

async function updateAboutData(updatedId, updatedData) {
    const data = await baseService.updateSingleData(JSON_MODEL_KEYS.ABOUT, updatedId, updatedData);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY, data);
}

module.exports = {
    getAboutData,
    updateAboutData
}