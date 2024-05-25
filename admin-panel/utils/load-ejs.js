const path = require("path");
const ejs = require("ejs");
const getRootPath = require("./root-path");
const fs = require("fs");
const generateResponse = require("./response-generator");
const { CONTENT_TYPES } = require("./constants");

const loadEJS = (filename, req, res, datas) => {
    const filePath = path.join(getRootPath(), "views", "pages", `${filename}.ejs`);

    fs.readFile(filePath, "utf-8", (err, data) => {
        if(err) {
            generateResponse({
                res: res,
                status: 500,
                header: CONTENT_TYPES[".txt"],
                data: "Internal server error"
            });
        } else {
            const renderedHTML = ejs.render(data, { rootPath: getRootPath(), datas });
            generateResponse({
                res: res,
                status: 200,
                header: CONTENT_TYPES[".html"],
                data: renderedHTML
            });
        }
    });
}

module.exports = loadEJS;