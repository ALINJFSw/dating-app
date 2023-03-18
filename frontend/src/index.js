const hum = document.getElementById("hum");
const navLinks1 = document.getElementById("ul1")
const navLinks2 = document.getElementById("ul2")
const welcome = document.getElementById("welcome");
const webLinks = document.getElementById("web-links");
const phoneLinks = document.getElementById("phone-links");
const test = false;
hum.addEventListener("click", () => {
 Work_place.home_work.showPhoneNav()
});



window.onload = () => {
    Work_place.home_work.HomePageRendering();
}
