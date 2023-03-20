const hum = document.getElementById("hum");
const submitSearch = document.getElementById("submit-search");
const logout1 = document.getElementById("logout1");
const logout2 = document.getElementById("logout2");
hum.addEventListener("click", () => {
 Work_place.home_work.showPhoneNav()
});



window.onload = () => {
    Work_place.home_work.HomePageRendering();
}

submitSearch.addEventListener("click" ,() =>{
    Work_place.home_work.getSearch()
} );

const logout = () => {
    console.log('clear');
    localStorage.clear();
}

logout1.addEventListener("click",logout)
logout2.addEventListener("click",logout)

