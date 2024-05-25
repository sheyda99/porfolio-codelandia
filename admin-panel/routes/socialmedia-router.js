const Router = require("./router");
const { SOCIALMEDIA_ENDPOINT, SOCIALMEDIA_ADD_ENDPOINT, SOCIALMEDIA_UPDATE_ENDPOINT, SOCIALMEDIA_DELETE_ENDPOINT } = require("../utils/url-helper");
const socialmediaController = require("../controllers/socialmedia-controller");

const router = new Router();

router.addRoute(SOCIALMEDIA_ENDPOINT, socialmediaController.getSocialMediaPage);
router.addRoute(SOCIALMEDIA_ADD_ENDPOINT, socialmediaController.addSocialMedia);
router.addRoute(SOCIALMEDIA_UPDATE_ENDPOINT, socialmediaController.updateSocialMedia, true);
router.addRoute(SOCIALMEDIA_DELETE_ENDPOINT, socialmediaController.deleteSocialMedia, true);

module.exports = router.handleRoute.bind(router);