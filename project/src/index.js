// Hero section elements
const fullname = document.getElementById("fullname");
const headings = document.getElementById("headings");
const heroSocialMedia = document.getElementById("hero-socialmedia");
const footerSocialMedia = document.getElementById("footer-socialmedia");

// About section elements
const aboutImg = document.getElementById("about-img");
const aboutText = document.getElementById("about-text");
const aboutName = document.getElementById("about-fullname");
const aboutPhone = document.getElementById("about-phone");
const aboutEmail = document.getElementById("about-email");
const aboutLinkedin = document.getElementById("about-linkedin");
const aboutCv = document.getElementById("about-cv");

// Contact details section elements
const contactAddress = document.getElementById("contact-address");
const contactPhones = document.getElementById("contact-phones");
const contactEmails = document.getElementById("contact-emails");
const contactLinkedin = document.getElementById("contact-linkedin");

// Copyright section elements
const copyrightYear = document.querySelector("#copyright span:nth-child(1)");
const copyrightName = document.querySelector("#copyright span:nth-child(2)");

// Services section elements
const serviceContainer = document.getElementById("services-container");

// Skills section elements
const skillsContainer = document.getElementById("skills-container");

// Portfolio section elements
const portfolioContainer = document.getElementById("portfolio-container");

// Statistics section elements
const clients = document.getElementById("clients");
const projects = document.getElementById("projects");
const awards = document.getElementById("awards");
const experience = document.getElementById("experience");

// Testimonials section elements
const testimonialsContainer = document.getElementById("testimonials-container");

// Contact Form section elements
const formContact = document.getElementById("form-contact");
const txtName = document.getElementById("form-contact-name");
const txtEmail = document.getElementById("form-contact-email");
const txtSubject = document.getElementById("form-contact-subject");
const txtMessage = document.getElementById("form-contact-message");





const rootUrl = "http://localhost:4444";

// Fetch and bind ABOUT DATA
async function getAboutData() {
    const resJSON = await fetch(`${rootUrl}/about`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindAboutData() {
    const data = await getAboutData();

    // Bind "Hero content"
    fullname.textContent = data[0].fullname;
    headings.innerHTML = "";
    const headingsArr = data[0].headings.split(", ");
    for(let i = 0; i < headingsArr.length; i++) {
        const span = document.createElement("span");
        span.textContent = headingsArr[i];
        headings.appendChild(span);
    }

    // Bind "About me content"
    aboutImg.setAttribute("src", `${rootUrl}${data[0].img}`);
    aboutText.textContent = data[0].text;
    aboutName.textContent = data[0].fullname;
    aboutPhone.textContent = data[0].phone.split(", ")[0];
    aboutEmail.textContent = data[0].email.split(", ")[0];
    const linkedinUrl = document.createElement("a");
    linkedinUrl.setAttribute("href", data[0].linkedin);
    linkedinUrl.setAttribute("target", "_blank");
    linkedinUrl.textContent = `/${(data[0].linkedin.split("/"))[data[0].linkedin.split("/").length-2]}`;
    aboutLinkedin.appendChild(linkedinUrl);
    aboutCv.setAttribute("href", `${rootUrl}${data[0].cv}`);

    // Bind "Contact details content"
    const address = document.createElement("figure");
    address.textContent = data[0].address;
    contactAddress.appendChild(address);
    const phones = data[0].phone.split(", ");
    for(let i = 0; i < phones.length; i++) {
        const phone = document.createElement("figure");
        phone.classList.add("mb-0");
        phone.textContent = phones[i];
        contactPhones.appendChild(phone);
    }
    const emails = data[0].email.split(", ");
    for(let i = 0; i < emails.length; i++) {
        const email = document.createElement("figure");
        email.classList.add("mb-0");
        email.textContent = emails[i];
        contactEmails.appendChild(email);
    }
    const linkedin = document.createElement("figure");
    linkedin.appendChild(linkedinUrl);
    contactLinkedin.append(linkedin);

    // Bind "Copyright content"
    const currDate = new Date();
    copyrightYear.textContent = currDate.getFullYear();
    copyrightName.textContent = data[0].fullname;
}

// Fetch and bind SERVICES DATA
async function getServicesData() {
    const resJSON = await fetch(`${rootUrl}/services`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindServicesData() {
    const data = await getServicesData();

    serviceContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        const col = document.createElement("div");
        col.classList.add("col-sm-6", "col-md-4", "col-xl-4");

        const item = document.createElement("div");
        item.classList.add("ts-item");
        const itemContent = document.createElement("div");
        itemContent.classList.add("ts-item-content");

        const itemHeader = document.createElement("div");
        itemHeader.classList.add("ts-item-header");
        const iconContainer = document.createElement("div");
        iconContainer.classList.add("icon");
        iconContainer.innerHTML = data[i].icon;
        itemHeader.appendChild(iconContainer);
        itemContent.appendChild(itemHeader);

        const itemBody = document.createElement("div");
        itemBody.classList.add("ts-item-body");
        const name = document.createElement("h4");
        name.textContent = data[i].name;
        itemBody.appendChild(name);
        const desc = document.createElement("p");
        desc.textContent = data[i].desc;
        itemBody.appendChild(desc);
        itemContent.appendChild(itemBody);

        item.appendChild(itemContent);
        col.appendChild(item);
        serviceContainer.appendChild(col);
    }
}

// Fetch and bind SKILLS DATA
async function getSkillsData() {
    const resJSON = await fetch(`${rootUrl}/skills`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindSkillsData() {
    const data = await getSkillsData();

    skillsContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        const progress = document.createElement("div");
        progress.classList.add("progress");
        progress.setAttribute("data-progress-width", `${data[i].progress}%`);

        const progressTitle = document.createElement("h5");
        progressTitle.classList.add("ts-progress-title");
        progressTitle.textContent = data[i].name;
        progress.appendChild(progressTitle);

        const progressValue = document.createElement("figure");
        progressValue.classList.add("ts-progress-value");
        progressValue.textContent = `${data[i].progress}%`;
        progressValue.style.left = `${data[i].progress}%`;
        progress.appendChild(progressValue);

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.style.width = `${data[i].progress}%`;
        progress.appendChild(progressBar);

        skillsContainer.appendChild(progress);
    }
}

// Fetch and bind PORFOLIO DATA
async function getPorfolioData() {
    const resJSON = await fetch(`${rootUrl}/portfolio`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindPortfolioData() {
    const data = await getPorfolioData();

    portfolioContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        const portfolioItem = document.createElement("a");
        portfolioItem.setAttribute("href", `${rootUrl}${data[i].img}`);
        portfolioItem.classList.add("card", "ts-gallery__item", "popup-image");

        const portfolioDesc = document.createElement("div");
        portfolioDesc.classList.add("ts-gallery__item-description");
        const portfolioCategory = document.createElement("h6");
        portfolioCategory.classList.add("ts-opacity__50");
        portfolioCategory.textContent = data[i].category;
        portfolioDesc.appendChild(portfolioCategory);
        const portfolioName = document.createElement("h4");
        portfolioName.textContent = data[i].name;
        portfolioDesc.appendChild(portfolioName);
        portfolioItem.appendChild(portfolioDesc);

        const portfolioImg = document.createElement("img");
        portfolioImg.setAttribute("src", `${rootUrl}${data[i].img}`);
        portfolioImg.setAttribute("alt", "");
        portfolioImg.classList.add("card-img");
        portfolioItem.appendChild(portfolioImg);

        portfolioContainer.appendChild(portfolioItem);
    }
}

// Fetch and bind STATISTICS DATA
async function getStatisticsData() {
    const resJSON = await fetch(`${rootUrl}/statistics`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindStatisticsData() {
    const data = await getStatisticsData();
    
    clients.dataset.odometerFinal = data[0].clients;
    projects.dataset.odometerFinal = data[0].projects;
    awards.dataset.odometerFinal = data[0].awards;
    experience.dataset.odometerFinal = data[0].experience;
}

// Fetch and bind TESTIMONIALS DATA
async function getClientsData() {
    const resJSON = await fetch(`${rootUrl}/clients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindClientsData() {
    const data = await getClientsData();

    testimonialsContainer.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        const slide = document.createElement("div");
        slide.classList.add("slide", "mb-5");

        const figure = document.createElement("figure");
        figure.classList.add("d-inline-block", "p-3", "ts-bg-primary", "text-white", "ts-has-talk-arrow");
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-quote-right");
        figure.appendChild(icon);
        slide.appendChild(figure);

        const message = document.createElement("p");
        message.classList.add("ts-h5");
        message.textContent = data[i].message;
        slide.appendChild(message);

        const image = document.createElement("div");
        image.classList.add("ts-circle__lg", "mb-3");
        image.setAttribute("data-bg-image", `${rootUrl}${data[i].img}`);
        slide.appendChild(image);

        const name = document.createElement("h5");
        name.textContent = data[i].name;
        slide.appendChild(name);

        const occupation = document.createElement("h6");
        occupation.classList.add("ts-opacity__40");
        occupation.textContent = data[i].occupation;
        slide.appendChild(occupation);

        testimonialsContainer.appendChild(slide);
    }
    initOwl();
    bgInit();
}

// Fetch and bind SOCIAL MEDIA DATA
async function getSocialMediaData() {
    const resJSON = await fetch(`${rootUrl}/socialmedia`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return await resJSON.json();
}
async function bindSocialMediaData() {
    const data = await getSocialMediaData();

    heroSocialMedia.innerHTML = "";
    footerSocialMedia.innerHTML = "";
    for(let i = 0; i < data.length; i++) {
        // Bind "Hero Social Media Content"
        const heroLink = document.createElement("a");
        heroLink.setAttribute("href", data[i].link);
        heroLink.classList.add("mr-3");
        heroLink.innerHTML = data[i].icon;
        heroSocialMedia.appendChild(heroLink);

        // Bind "Footer Social Media Content"
        const footerLink = document.createElement("a");
        footerLink.setAttribute("href", data[i].link);
        footerLink.classList.add("mb-3", "d-flex", "text-white", "ts-align__vertical");
        const icon = document.createElement("span");
        icon.classList.add("ts-circle__xs", "border", "border-white", "ts-border-light", "mr-4");
        icon.innerHTML = data[i].icon;
        footerLink.appendChild(icon);
        const name = document.createElement("span");
        name.textContent = data[i].name;
        footerLink.appendChild(name);
        footerSocialMedia.appendChild(footerLink);
    }
}

// Fetch and bind SOCIAL MEDIA DATA
async function addContactData(data) {
    const resJSON = await fetch(`${rootUrl}/contact/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await resJSON.json();
}
const sendContactReq = () => {
    const data = {
        name: txtName.value,
        email: txtEmail.value,
        subject: txtSubject.value,
        message: txtMessage.value
    }
    addContactData(data)
    .then(response => {
        if (response.success) alert("Your message sent successfully!");
        txtName.value = "";
        txtEmail.value = "";
        txtSubject.value = "";
        txtMessage.value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
}



const onLoad = () => {
    bindAboutData();
    bindServicesData();
    bindSkillsData();
    bindPortfolioData();
    bindStatisticsData();
    bindClientsData();
    bindSocialMediaData();
    formContact.addEventListener("submit", sendContactReq);
}
document.addEventListener("DOMContentLoaded", onLoad);