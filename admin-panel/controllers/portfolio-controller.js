const loadEJS = require("../utils/load-ejs");
const _portfolioService = require("../services/portfolio-service");
const Portfolio = require("../models/portfolio");
const createDir = require("../utils/dir-generator");
const fs = require("fs");
const path = require("path");
const getRootPath = require("../utils/root-path");
const formidable = require("formidable");

const getPortfolioPage = async (req, res) => {
    const data = await _portfolioService.getPortfolioData();
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
        loadEJS("portfolio", req, res, data);
    }
}

const addPortfolio = async (req, res) => {
    createDir('uploads/portfolio');

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(getRootPath(), 'public', 'uploads', 'portfolio');
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form: ", err);
            return;
        }
        
        const imgExtension = path.extname(files.img[0].originalFilename);
        const imgPath = files.img[0].filepath;
        const imgName = path.basename(imgPath+imgExtension);
        const newImgPath = path.join(getRootPath(), 'public' , 'uploads', 'portfolio', imgName);
        fs.renameSync(imgPath, newImgPath);
        
        const parsedBody = fields;
        const portfolio = new Portfolio(parsedBody.name[0], `/uploads/portfolio/${imgName}`, parsedBody.category[0]);
        const data = await _portfolioService.addPortfolioData(portfolio);
        getPortfolioPage(req, res);
    });
}

const updatePortfolio = async (req, res, updatedId) => {
    createDir('uploads/portfolio');

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(getRootPath(), 'public', 'uploads', 'portfolio');
    
    form.parse(req, async (err, fields, files) => {
        let imgName;
        if (err) {
            const data = await _portfolioService.getPortfolioData();
            data.forEach(d => {
                if (d.id == updatedId) imgName = d.img.split("/").pop();
            });
        } else {
            const imgExtension = path.extname(files.img[0].originalFilename);
            const imgPath = files.img[0].filepath;
            imgName = path.basename(imgPath+imgExtension);
            const newImgPath = path.join(getRootPath(), 'public' , 'uploads', 'portfolio', imgName);
            fs.renameSync(imgPath, newImgPath);
        }
        
        const parsedBody = fields;
        const portfolio = new Portfolio(parsedBody.name[0], `/uploads/portfolio/${imgName}`, parsedBody.category[0]);
        const data = await _portfolioService.updatePortfolioData(updatedId, portfolio);
        getPortfolioPage(req, res);
    });  
}

const deletePortfolio = async (req, res, deletedId) => {
    const data = await _portfolioService.deletePortfolioData(deletedId);
    getPortfolioPage(req, res);
}

module.exports = {
    getPortfolioPage,
    addPortfolio,
    updatePortfolio,
    deletePortfolio
}