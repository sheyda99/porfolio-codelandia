const loadEJS = require("../utils/load-ejs");
const _clientsService = require("../services/clients-service");
const Clients = require("../models/clients");
const createDir = require("../utils/dir-generator");
const fs = require("fs");
const path = require("path");
const getRootPath = require("../utils/root-path");
const formidable = require("formidable");

const getClientsPage = async (req, res) => {
    const data = await _clientsService.getClientsData();
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
        loadEJS("clients", req, res, data);
    }
}

const addClient = async (req, res) => {
    createDir('uploads/clients');

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(getRootPath(), 'public', 'uploads', 'clients');
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form: ", err);
            return;
        }
        
        const imgExtension = path.extname(files.img[0].originalFilename);
        const imgPath = files.img[0].filepath;
        const imgName = path.basename(imgPath+imgExtension);
        const newImgPath = path.join(getRootPath(), 'public' , 'uploads', 'clients', imgName);
        fs.renameSync(imgPath, newImgPath);
        
        const parsedBody = fields;
        const client = new Clients(parsedBody.name, parsedBody.occupation, parsedBody.message, `/uploads/clients/${imgName}`);
        const data = await _clientsService.addClientsData(client);
        getClientsPage(req, res);
    });
}

const updateClient = async (req, res, updatedId) => {
    createDir('uploads/clients');

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(getRootPath(), 'public', 'uploads', 'clients');
    
    form.parse(req, async (err, fields, files) => {
        let imgName;
        if (err) {
            const data = await _clientsService.getClientsData();
            data.forEach(d => {
                if (d.id == updatedId) imgName = d.img.split("/").pop();
            });
        } else {
            const imgExtension = path.extname(files.img[0].originalFilename);
            const imgPath = files.img[0].filepath;
            imgName = path.basename(imgPath+imgExtension);
            const newImgPath = path.join(getRootPath(), 'public' , 'uploads', 'clients', imgName);
            fs.renameSync(imgPath, newImgPath);
        }
        
        const parsedBody = fields;
        const client = new Clients(parsedBody.name, parsedBody.occupation, parsedBody.message, `/uploads/clients/${imgName}`);
        const data = await _clientsService.updateClientData(updatedId, client);
        getClientsPage(req, res);
    });
}

const deleteClient = async (req, res, deletedId) => {
    const data = await _clientsService.deleteClientData(deletedId);
    getClientsPage(req, res);
}

module.exports = {
    getClientsPage,
    addClient,
    updateClient,
    deleteClient
}