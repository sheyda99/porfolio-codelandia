const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getSocialMediaData() {
    return await baseService.getData(JSON_MODEL_KEYS.SOCIALMEDIA);
}

async function addSocialMediaData(model) {
    const data = await baseService.insertData(JSON_MODEL_KEYS.SOCIALMEDIA, model);
    return new SuccessResult(DATA_ADDED_SUCCESSFULLY, data);
}

async function updateSocialMediaData(updatedId, model) {
    const data = await baseService.updateAllData(JSON_MODEL_KEYS.SOCIALMEDIA, updatedId, model);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY, data);
}

async function deleteSocialMediaData(deletedId) {
    const data = await baseService.deleteData(JSON_MODEL_KEYS.SOCIALMEDIA, deletedId);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_DELETED_SUCCESSFULLY, data);
}

module.exports = {
    getSocialMediaData,
    addSocialMediaData,
    updateSocialMediaData,
    deleteSocialMediaData
}