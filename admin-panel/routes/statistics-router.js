const Router = require("./router");
const { STATISTICS_ENDPOINT, STATISTICS_UPDATE_ENDPOINT } = require("../utils/url-helper");
const statisticsController = require("../controllers/statistics-controller");

const router = new Router();

router.addRoute(STATISTICS_ENDPOINT, statisticsController.getStatisticsPage);
router.addRoute(STATISTICS_UPDATE_ENDPOINT, statisticsController.updateStatisticsInfo);

module.exports = router.handleRoute.bind(router);