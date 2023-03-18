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
