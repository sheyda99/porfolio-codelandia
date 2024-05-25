const loadEJS = require("../utils/load-ejs");
const _socialmediaService = require("../services/socailmedia-service");
const SocialMedia = require("../models/socialmedia");
const parseRequestBody = require("../utils/parser");

const getSocialMediaPage = async (req, res) => {
    const data = await _socialmediaService.getSocialMediaData();
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
        loadEJS("socialmedia", req, res, data);
    }
}

const addSocialMedia = async (req, res) => {
    const parsedBody = await parseRequestBody(req);
    const socialmedia = new SocialMedia(parsedBody.name, parsedBody.icon, parsedBody.link);
    const data = await _socialmediaService.addSocialMediaData(socialmedia);
    getSocialMediaPage(req, res);
}

const updateSocialMedia = async (req, res, updatedId) => {
    const parsedBody = await parseRequestBody(req);
    const socialmedia = new SocialMedia(parsedBody.name, parsedBody.icon, parsedBody.link);
    const data = await _socialmediaService.updateSocialMediaData(updatedId, socialmedia);
    getSocialMediaPage(req, res);
}

const deleteSocialMedia = async (req, res, deletedId) => {
    const data = await _socialmediaService.deleteSocialMediaData(deletedId);
    getSocialMediaPage(req, res);
}

module.exports = {
    getSocialMediaPage,
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia
}