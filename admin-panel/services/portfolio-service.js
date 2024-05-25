const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getPortfolioData() {
    return await baseService.getData(JSON_MODEL_KEYS.PORTFOLIO);
}

async function addPortfolioData(model) {
    const data = await baseService.insertData(JSON_MODEL_KEYS.PORTFOLIO, model);
    return new SuccessResult(DATA_ADDED_SUCCESSFULLY, data);
}

async function updatePortfolioData(updatedId, model) {
    const data = await baseService.updateAllData(JSON_MODEL_KEYS.PORTFOLIO, updatedId, model);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY, data);
}

async function deletePortfolioData(deletedId) {
    const data = await baseService.deleteData(JSON_MODEL_KEYS.PORTFOLIO, deletedId);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_DELETED_SUCCESSFULLY, data);
}

module.exports = {
    getPortfolioData,
    addPortfolioData,
    updatePortfolioData,
    deletePortfolioData
}