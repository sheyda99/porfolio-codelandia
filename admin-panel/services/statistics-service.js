const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_UPDATED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getStatisticsData() {
    return await baseService.getData(JSON_MODEL_KEYS.STATISTICS);
}

async function updateStatisticsData(updatedId, updatedData) {
    const data = await baseService.updateSingleData(JSON_MODEL_KEYS.STATISTICS, updatedId, updatedData);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY, data);
}

module.exports = {
    getStatisticsData,
    updateStatisticsData
}