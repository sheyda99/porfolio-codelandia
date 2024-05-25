const Router = require("./router");
const { CLIENTS_ENDPOINT, CLIENTS_ADD_ENDPOINT, CLIENTS_UPDATE_ENDPOINT, CLIENTS_DELETE_ENDPOINT } = require("../utils/url-helper");
const clientsController = require("../controllers/clients-controller");

const router = new Router();

router.addRoute(CLIENTS_ENDPOINT, clientsController.getClientsPage);
router.addRoute(CLIENTS_ADD_ENDPOINT, clientsController.addClient);
router.addRoute(CLIENTS_UPDATE_ENDPOINT, clientsController.updateClient, true);
router.addRoute(CLIENTS_DELETE_ENDPOINT, clientsController.deleteClient, true);

module.exports = router.handleRoute.bind(router);