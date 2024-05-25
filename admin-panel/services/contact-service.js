const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_ADDED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getContactData() {
    return await baseService.getData(JSON_MODEL_KEYS.CONTACT);
}

async function addContactData(model) {
    const data = await baseService.insertData(JSON_MODEL_KEYS.CONTACT, model);
    return new SuccessResult(DATA_ADDED_SUCCESSFULLY, data);
}

async function deleteContactData(deletedId) {
    const data = await baseService.deleteData(JSON_MODEL_KEYS.CONTACT, deletedId);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_DELETED_SUCCESSFULLY, data);
}

module.exports = {
    getContactData,
    addContactData,
    deleteContactData
}