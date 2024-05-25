const loadEJS = require("../utils/load-ejs");
const _statisticsService = require("../services/statistics-service");
const Statistics = require("../models/statistics");
const parseRequestBody = require("../utils/parser");

const getStatisticsPage = async (req, res) => {
    const data = await _statisticsService.getStatisticsData();
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
        loadEJS("statistics", req, res, data);
    }
}

const updateStatisticsInfo = async (req, res) => {
    const parsedBody = await parseRequestBody(req);
    const statistics = new Statistics(parsedBody.clients, parsedBody.projects, parsedBody.awards, parsedBody.experience);
    const data = await _statisticsService.updateStatisticsData(0, statistics);
    getStatisticsPage(req, res);
}

module.exports = {
    getStatisticsPage,
    updateStatisticsInfo
}