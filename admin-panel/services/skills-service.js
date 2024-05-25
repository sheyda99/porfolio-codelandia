const baseService = require("./base-service");
const { JSON_MODEL_KEYS } = require("../utils/enums");
const { SuccessResult, ErrorResult } = require("../utils/results/result");
const { DATA_ADDED_SUCCESSFULLY, DATA_UPDATED_SUCCESSFULLY, DATA_DELETED_SUCCESSFULLY, DATA_DOESNT_EXISTS } = require("../utils/messages/base-messages");

async function getSkillsData() {
    return await baseService.getData(JSON_MODEL_KEYS.SKILLS);
}

async function addSkillsData(model) {
    const data = await baseService.insertData(JSON_MODEL_KEYS.SKILLS, model);
    return new SuccessResult(DATA_ADDED_SUCCESSFULLY, data);
}

async function updateSkillsData(updatedId, model) {
    const data = await baseService.updateAllData(JSON_MODEL_KEYS.SKILLS, updatedId, model);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_UPDATED_SUCCESSFULLY, data);
}

async function deleteSkillData(deletedId) {
    const data = await baseService.deleteData(JSON_MODEL_KEYS.SKILLS, deletedId);
    if(data == null)
        return new ErrorResult(DATA_DOESNT_EXISTS);
    return new SuccessResult(DATA_DELETED_SUCCESSFULLY, data);
}

module.exports = {
    getSkillsData,
    addSkillsData,
    updateSkillsData,
    deleteSkillData
}