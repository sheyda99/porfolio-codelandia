const loadEJS = require("../utils/load-ejs");
const _aboutService = require("../services/about-service");
const About = require("../models/about");
const fs = require("fs");
const path = require("path");
const getRootPath = require("../utils/root-path");
const formidable = require("formidable");

const getAboutPage = async (req, res) => {
    const data = await _aboutService.getAboutData();
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
        loadEJS("about", req, res, data);
    }
}

const updateAboutInfo = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(getRootPath(), 'public', 'uploads');
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing form: ", err);
            return;
        }

        const imgExtension = path.extname(files.img[0].originalFilename);
        const imgPath = files.img[0].filepath;
        const imgName = path.basename(imgPath+imgExtension);
        const newImgPath = path.join(getRootPath(), 'public' , 'uploads', imgName);
        fs.renameSync(imgPath, newImgPath);

        const cvExtension = path.extname(files.cv[0].originalFilename);
        const cvPath = files.cv[0].filepath;
        const cvName = path.basename(cvPath+cvExtension);
        const newCvPath = path.join(getRootPath(), 'public', 'uploads', cvName);
        fs.renameSync(cvPath, newCvPath);
        
        const parsedBody = fields;
        const about = new About(parsedBody.fullname[0], parsedBody.headings[0], parsedBody.text[0], parsedBody.email[0], parsedBody.phone[0], parsedBody.linkedin[0], parsedBody.address[0], `/uploads/${imgName}`, `/uploads/${cvName}`);
        const data = await _aboutService.updateAboutData(0, about);
        getAboutPage(req, res);
    });
}

module.exports = {
    getAboutPage,
    updateAboutInfo
}