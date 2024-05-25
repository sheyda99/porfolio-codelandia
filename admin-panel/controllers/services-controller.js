const loadEJS = require("../utils/load-ejs");
const _servicesService = require("../services/services-service");
const Services = require("../models/services");
const parseRequestBody = require("../utils/parser");

const getServicesPage = async (req, res) => {
    const data = await _servicesService.getServicesData();
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
        loadEJS("services", req, res, data);
    }
}

const addService = async (req, res) => {
    const parsedBody = await parseRequestBody(req);
    const service = new Services(parsedBody.name, parsedBody.desc, parsedBody.icon);
    const data = await _servicesService.addServiceData(service);
    getServicesPage(req, res);
}

const updateService = async (req, res, updatedId) => {
    const parsedBody = await parseRequestBody(req);
    const service = new Services(parsedBody.name, parsedBody.desc, parsedBody.icon);
    const data = await _servicesService.updateServiceData(updatedId, service);
    getServicesPage(req, res);
}

const deleteService = async (req, res, deletedId) => {
    const data = await _servicesService.deleteServiceData(deletedId);
    getServicesPage(req, res);
}

module.exports = {
    getServicesPage,
    addService,
    updateService,
    deleteService
}