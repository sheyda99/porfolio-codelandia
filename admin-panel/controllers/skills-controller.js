const loadEJS = require("../utils/load-ejs");
const _skillsService = require("../services/skills-service");
const Skills = require("../models/skills");
const parseRequestBody = require("../utils/parser");

const getSkillsPage = async (req, res) => {
    const data = await _skillsService.getSkillsData();
    const contentType = req.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Max-Age": 2592000,
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            "Content-Type": "application/json"
        };        
        res.writeHead(200, headers);
        res.end(JSON.stringify(data));
    } else {
        loadEJS("skills", req, res, data);
    }
}

const addSkill = async (req, res) => {
    const parsedBody = await parseRequestBody(req);
    const skill = new Skills(parsedBody.name, parsedBody.progress);
    const data = await _skillsService.addSkillsData(skill);
    getSkillsPage(req, res);
}

const updateSkill = async (req, res, updatedId) => {
    const parsedBody = await parseRequestBody(req);
    const skill = new Skills(parsedBody.name, parsedBody.progress);
    const data = await _skillsService.updateSkillsData(updatedId, skill);
    getSkillsPage(req, res);
}

const deleteSkill = async (req, res, deletedId) => {
    const data = await _skillsService.deleteSkillData(deletedId);
    getSkillsPage(req, res);
}

module.exports = {
    getSkillsPage,
    addSkill,
    updateSkill,
    deleteSkill
}