const path = require("path");
const fs = require("fs");
const getRootPath = require("./root-path");

const createDir = dirUrl => {
    const newDir = path.join(getRootPath(), 'public', dirUrl);
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
    }
}

module.exports = createDir;