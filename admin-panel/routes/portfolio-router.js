const Router = require("./router");
const { PORTFOLIO_ENDPOINT, PORTFOLIO_ADD_ENDPOINT, PORTFOLIO_UPDATE_ENDPOINT, PORTFOLIO_DELETE_ENDPOINT } = require("../utils/url-helper");
const portfolioController = require("../controllers/portfolio-controller");

const router = new Router();

router.addRoute(PORTFOLIO_ENDPOINT, portfolioController.getPortfolioPage);
router.addRoute(PORTFOLIO_ADD_ENDPOINT, portfolioController.addPortfolio);
router.addRoute(PORTFOLIO_UPDATE_ENDPOINT, portfolioController.updatePortfolio, true);
router.addRoute(PORTFOLIO_DELETE_ENDPOINT, portfolioController.deletePortfolio, true);

module.exports = router.handleRoute.bind(router);