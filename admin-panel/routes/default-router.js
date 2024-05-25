const Router = require("./router");
const { DEFAULT_ENDPOINT } = require("../utils/url-helper");
const defaultController = require("../controllers/default-controller");

const router = new Router();

router.addRoute(DEFAULT_ENDPOINT, defaultController.getDefaultPage);

module.exports = router.handleRoute.bind(router);