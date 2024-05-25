const defaultHandler = require("./default-router");
const aboutHandler = require("./about-router");
const servicesHandler = require("./services-router");
const skillsHandler = require("./skills-router");
const portfolioHandler = require("./portfolio-router");
const statisticsHandler = require("./statistics-router");
const clientsHandler = require("./clients-router");
const socialMediaHandler = require("./socialmedia-router");
const contactHandler = require("./contact-router");

module.exports = [
    defaultHandler,
    aboutHandler,
    servicesHandler,
    skillsHandler,
    portfolioHandler,
    statisticsHandler,
    clientsHandler,
    socialMediaHandler,
    contactHandler
]