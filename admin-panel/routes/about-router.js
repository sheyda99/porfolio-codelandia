const Router = require("./router");
const { ABOUT_ENDPOINT, ABOUT_UPDATE_ENDPOINT } = require("../utils/url-helper");
const aboutController = require("../controllers/about-controller");

const router = new Router();

router.addRoute(ABOUT_ENDPOINT, aboutController.getAboutPage);
router.addRoute(ABOUT_UPDATE_ENDPOINT, aboutController.updateAboutInfo);

module.exports = router.handleRoute.bind(router);