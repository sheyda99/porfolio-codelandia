const http = require("http");
const createDir = require("./utils/dir-generator");
const ROUTES = require("./routes/routes");
const useStaticFiles = require("./middlewares/static-file-middleware");
const useCORS = require("./middlewares/cors-middleware");

const PORT = 4444;

createDir('uploads');

const server = http.createServer((req, res) => {
    useStaticFiles(req, res, () => {
        useCORS(req, res, () => {
            handleDynamicRoutes(req, res);
        });
    });
});

const handleDynamicRoutes = (req, res) => {
    let found = false;
    for(const handler of ROUTES) {
        if(handler(req, res)) {
            found = true;
            break;
        }
    }
    if(!found)
        show404Page(req, res);
}
const show404Page = (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
}

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});