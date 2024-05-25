const loadEJS = require("../utils/load-ejs");

const getDefaultPage = (req, res) => {
    loadEJS("index", req, res);
}

module.exports = {
   getDefaultPage
}