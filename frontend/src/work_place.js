const Work_place =  {};
Work_place.home_work = {}
Work_place.home_work.showNav = false;
Work_place.home_work.showPhoneNav = () => {
    const Phonenav = document.getElementById("phoneNav");
    if (Work_place.showNav == false) {
        Phonenav.style.display = "block";
        Work_place.showNav = true;
    }
    else {
        Phonenav.style.display = "none";
        Work_place.showNav = false;

    }
}


Work_place.home_work.popular = `
    <h1>Datting app</h1>
    <h2>Love At First Chat</h2>
    <a href="register.html" class="primary-button">Register</a>
`

Work_place.home_work.HomePageRendering = () => {
    if(!true){
        const webLinks = document.getElementById("web-links");
        const phoneLinks = document.getElementById("phoneNav");
        const navLinks1 = document.getElementById("ul1");
        const navLinks2 = document.getElementById("ul2");
        const main = document.getElementById("main");
        const userContent = document.getElementById("user-content");
        main.removeChild(userContent);
        webLinks.removeChild(navLinks2);
        phoneLinks.removeChild(navLinks1);
        
        const welcome = document.createElement("div");
        welcome.className = 'main-title';
        welcome.innerHTML = Work_place.home_work.popular;
        main.appendChild(welcome);
    }
}