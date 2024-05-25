const Router = require("./router");
const { SERVICES_ENDPOINT, SERVICES_ADD_ENDPOINT, SERVICES_UPDATE_ENDPOINT, SERVICES_DELETE_ENDPOINT } = require("../utils/url-helper");
const servicesController = require("../controllers/services-controller");

const router = new Router();

router.addRoute(SERVICES_ENDPOINT, servicesController.getServicesPage);
router.addRoute(SERVICES_ADD_ENDPOINT, servicesController.addService);
router.addRoute(SERVICES_UPDATE_ENDPOINT, servicesController.updateService, true);
router.addRoute(SERVICES_DELETE_ENDPOINT, servicesController.deleteService, true);

module.exports = router.handleRoute.bind(router);