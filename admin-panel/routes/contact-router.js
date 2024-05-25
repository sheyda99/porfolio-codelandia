const Router = require("./router");
const { CONTACT_ENDPOINT, CONTACT_ADD_ENDPOINT, CONTACT_DELETE_ENDPOINT } = require("../utils/url-helper");
const contactController = require("../controllers/contact-controller");

const router = new Router();

router.addRoute(CONTACT_ENDPOINT, contactController.getContactPage);
router.addRoute(CONTACT_ADD_ENDPOINT, contactController.addContact);
router.addRoute(CONTACT_DELETE_ENDPOINT, contactController.deleteContact, true);

module.exports = router.handleRoute.bind(router);