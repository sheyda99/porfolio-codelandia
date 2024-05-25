const Router = require("./router");
const { SKILLS_ENDPOINT, SKILLS_ADD_ENDPOINT, SKILLS_UPDATE_ENDPOINT, SKILLS_DELETE_ENDPOINT } = require("../utils/url-helper");
const skillsController = require("../controllers/skills-controller");

const router = new Router();

router.addRoute(SKILLS_ENDPOINT, skillsController.getSkillsPage);
router.addRoute(SKILLS_ADD_ENDPOINT, skillsController.addSkill);
router.addRoute(SKILLS_UPDATE_ENDPOINT, skillsController.updateSkill, true);
router.addRoute(SKILLS_DELETE_ENDPOINT, skillsController.deleteSkill, true);

module.exports = router.handleRoute.bind(router);