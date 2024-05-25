const loadEJS = require("../utils/load-ejs");
const _contactService = require("../services/contact-service");
const Contact = require("../models/contact");

const parseRequestBody = async (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
    });
};

const getContactPage = async (req, res) => {
    const data = await _contactService.getContactData();
    loadEJS("contact", req, res, data);
}

const addContact = async (req, res) => {
    const parsedBody = await parseRequestBody(req);
    const contact = new Contact(parsedBody.name, parsedBody.email, parsedBody.subject, parsedBody.message);
    const data = await _contactService.addContactData(contact);
    console.log(req);
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
}

const deleteContact = async (req, res, deletedId) => {
    const data = await _contactService.deleteContactData(deletedId);
    getContactPage(req, res);
}

module.exports = {
    getContactPage,
    addContact,
    deleteContact
}