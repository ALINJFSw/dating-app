const hum = document.getElementById("hum");
const submitSearch = document.getElementById("submit-search");
hum.addEventListener("click", () => {
 Work_place.home_work.showPhoneNav()
});



window.onload = () => {
    Work_place.home_work.HomePageRendering();
}

submitSearch.addEventListener("click" ,() =>{
    Work_place.home_work.getSearch()
} );